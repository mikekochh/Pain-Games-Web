import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabaseServer";

export async function POST(req) {
    try {
        const { totalVolume, workoutDuration, workoutID } = await req.json();

        console.log("totalVolume: ", totalVolume);

        // Update workout to be finished
        const { data, error } = await supabase
            .from("workouts") // Specify the table name
            .update({ 
                total_volume: totalVolume,
                workout_length: workoutDuration
            })
            .eq('id', workoutID);

        // Handle potential errors
        if (error) {
            console.log("error finishing workout: ", error);
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        // Return the generated workout ID
        return NextResponse.json({ status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
    }
}
