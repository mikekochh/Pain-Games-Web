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
                .from("exercise_maxes")
                .select("weight_max")
                .eq("user_id", userID)
                .eq("exercise_id", exerciseID)
                .maybeSingle();

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

        console.log("Updates made: ", updates);

        return NextResponse.json({ success: true, updates }, { status: 200 });
    } catch (error) {
        console.error("An unexpected error occurred: ", error);
        return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
    }
}
