import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabaseServer";

export async function POST(req) {
    try {
        const { email } = await req.json();
        const lowerCaseEmail = email.toLowerCase();

        // Insert a new workout into the "workouts" table
        const { data, error } = await supabase
            .from("emails") // Specify the table name
            .insert([{ lowerCaseEmail }]) // Insert the userID

        // Handle potential errors
        if (error) {
            console.log("error entering email: ", error);
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        // Return the generated workout ID
        return NextResponse.json({ status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
    }
}
