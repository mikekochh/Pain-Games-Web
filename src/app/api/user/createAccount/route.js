import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabaseServer";

export async function POST(req) {
    try {
        const { email, username, password } = await req.json();

        // Check if the username already exists
        const { data: emailExists, error: emailCheckError } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('username', username)
            .single();

        if (emailExists) {
            console.log("An account with this username already exists");
            return NextResponse.json(
                { error: "An account with this username already exists" },
                { status: 409 }
            );
        }

        // Create a new user in the auth table
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
            email_confirmed_at: Date.now()
        });

        if (authError) {
            console.error("Error creating user in auth table:", authError);
            return NextResponse.json(
                { error: "There was an error creating a new account for authentication" },
                { status: 500 }
            );
        }

        const authUserId = authData?.user?.id;

        try {
            // Insert user into user_profiles table
            const { data: newUser, error: newUserError } = await supabase
                .from('user_profiles')
                .insert([{ email, username }])
                .select();

            if (newUserError) {
                console.error("Error creating new account in user_profiles:", newUserError);

                // Rollback: Delete user from auth table
                if (authUserId) {
                    await supabase.auth.api.deleteUser(authUserId);
                }

                return NextResponse.json(
                    { error: newUserError.message },
                    { status: 400 }
                );
            }

            console.log("newUser: ", newUser);

            const userId = newUser?.[0]?.id;
            return NextResponse.json(
                { success: true, message: "Account created successfully!", userId },
                { status: 200 }
            );

        } catch (profileError) {
            console.error("Error inserting into user_profiles:", profileError);

            // Rollback: Delete user from auth table
            if (authUserId) {
                await supabase.auth.api.deleteUser(authUserId);
            }

            return NextResponse.json(
                { error: "An error occurred while creating the account. Changes have been rolled back." },
                { status: 500 }
            );
        }
    } catch (error) {
        console.error("Unexpected error:", error);
        return NextResponse.json(
            { error: "An unexpected error occurred while creating an account" },
            { status: 500 }
        );
    }
}
