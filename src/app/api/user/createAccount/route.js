import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabaseServer";

export async function POST(req) {
    try {
        const { email, username, password } = await req.json();

        const { data: emailExists, error } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('username', username)
            .single();

        if (emailExists) {
            console.log("An account with this username already exists");
            return NextResponse.json({ error: "An account with this username already exists "}, { status: 409 });
        }

        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password
        })

        if (authError) {
            console.error("There was an error creating a new account from auth: ", authError);
            return NextResponse.json({ error: "There was an error creating a new account for authentication"}, { status: 500 });
        }

        const { data: newUser, error: newUserError } = await supabase
            .from('user_profiles')
            .insert(
                [
                    {
                        email: email,
                        username: username,
                    },
                ],
            ).select();
        
        if (newUserError) {
            console.log("Error creating new account: ", newUserError);
            return NextResponse.json({ error: newUserError.message }, { status: 400 });
        }

        console.log("newUser: ", newUser);
        
        // Assuming the table uses an `id` field for the primary key
        const userId = newUser?.[0]?.id;

        console.log("userID: ", userId);
        
        return NextResponse.json(
            { success: true, message: "Account created successfully!", userId },
            { status: 200 }
        );
    } catch (error) {
        console.error(err);
        return NextResponse.json({ error: "An unexpected error occurred while creating an account" }, { status: 500 });
    }
}