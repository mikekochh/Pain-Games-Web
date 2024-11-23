import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabaseServer";

export async function POST(req) {
    try {
        const { userID, sets, exerciseID, workoutID } = await req.json();

        if (!userID || !Array.isArray(sets) || !exerciseID || !workoutID) {
            return NextResponse.json({ error: 'Missing or invalid input data' }, { status: 400 });
        }

        console.log("userID: ", userID);
        console.log("sets: ", sets);
        console.log("exerciseID: ", exerciseID);
        console.log("workoutID: ", workoutID);

        const setsToInsert = sets.map((set) => ({
            user_id: userID,
            exercise_id: exerciseID,
            workout_id: workoutID,
            weight: set.weight,
            reps: set.reps
        }));

        const { data, error } = await supabase
            .from('sets')
            .insert(setsToInsert);


        if (error) {
            console.log("error entering sets into database: ", error);
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json({ message: "Sets inserted successfully", data }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
    }
}
