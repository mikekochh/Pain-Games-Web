import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabaseServer";

export async function POST(req) {
    try {
        const { userID, workoutSets } = await req.json();

        console.log("userID: ", userID);
        console.log("workoutSets: ", workoutSets);

        // Step 1: Group workout sets by exerciseID and calculate total weight moved
        const totalWeightsByExercise = workoutSets.reduce((acc, set) => {
            const { exerciseID, reps, weight } = set;
            const totalWeight = parseInt(reps) * parseInt(weight);

            if (!acc[exerciseID]) {
                acc[exerciseID] = 0;
            }
            acc[exerciseID] += totalWeight;

            return acc;
        }, {});

        console.log("Total weights by exercise: ", totalWeightsByExercise);

        // Step 2: Check the database for previous max weight moved for each exercise
        const updates = [];
        for (const [exerciseID, totalWeightMoved] of Object.entries(totalWeightsByExercise)) {
            // Fetch the user's max weight for the exercise
            const { data: maxData, error: fetchError } = await supabase
                .from('exercise_maxes')
                .select('weight_max')
                .eq('user_id', userID)
                .eq('exercise_id', exerciseID)
                .order('created_at', { ascending: false }) // Sort by most recent
                .limit(1)
                .single(); // Ensure a single object is returned
        

            if (fetchError) {
                console.error(`Error fetching max weight for exercise ${exerciseID}:`, fetchError);
                continue;
            }

            // If no previous max or new total weight exceeds the max, update the database
            if (!maxData || totalWeightMoved > maxData.weight_max) {
                const { error: updateError } = await supabase
                    .from("exercise_maxes")
                    .upsert({
                        user_id: userID,
                        exercise_id: parseInt(exerciseID),
                        weight_max: totalWeightMoved,
                    });

                if (updateError) {
                    console.error(`Error updating max weight for exercise ${exerciseID}:`, updateError);
                } else {
                    updates.push({ exerciseID, newMax: totalWeightMoved });
                }
            }
        }

        // Step 3: Find the highest weight for each set and check for new PRs
        const highestWeightsByExercise = workoutSets.reduce((acc, set) => {
            const { exerciseID, weight } = set;
            const weightValue = parseInt(weight);

            if (!acc[exerciseID] || weightValue > acc[exerciseID]) {
                acc[exerciseID] = weightValue;
            }

            return acc;
        }, {});

        console.log("Highest weights by exercise: ", highestWeightsByExercise);

        for (const [exerciseID, highestWeight] of Object.entries(highestWeightsByExercise)) {
            // Fetch the user's max weight for the exercise
            const { data: maxData, error: fetchError } = await supabase
                .from("user_prs")
                .select("weight")
                .eq("user_id", userID)
                .eq("exercise_id", exerciseID)
                .order("created_at", { ascending: false }) // Sort by most recent
                .limit(1) // Fetch only the latest record
                .single(); // Ensure a single object is returned

            if (fetchError) {
                console.error(`Error fetching PR max weight for exercise ${exerciseID}:`, fetchError);
                continue;
            }

            console.log("maxData: ", maxData);

            // If no previous max or new highest weight exceeds the max, update the database
            if (!maxData || highestWeight > maxData.weight) {
                const { error: updateError } = await supabase
                    .from("user_prs")
                    .upsert({
                        user_id: userID,
                        exercise_id: parseInt(exerciseID),
                        weight: highestWeight,
                    });

                if (updateError) {
                    console.error(`Error updating PR max weight for exercise ${exerciseID}:`, updateError);
                } else {
                    updates.push({ exerciseID, weight: highestWeight });
                }
            }
        }

        console.log("Updates made: ", updates);

        return NextResponse.json({ success: true, updates }, { status: 200 });
    } catch (error) {
        console.error("An unexpected error occurred: ", error);
        return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
    }
}
