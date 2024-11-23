import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabaseServer";

export async function POST(req) {
    try {
        const { userID } = await req.json();

        // Insert a new workout into the "workouts" table
        const { data, error } = await supabase
            .from("workouts") // Specify the table name
            .insert([{ userID }]) // Insert the userID
            .select("id") // Select the generated ID
            .single(); // Ensure we get a single row

        // Handle potential errors
        if (error) {
            console.log("error: ", error);
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        // Return the generated workout ID
        return NextResponse.json({ workoutID: data.id }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
    }
}
