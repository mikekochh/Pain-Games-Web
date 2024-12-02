import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabaseServer";

export async function POST(req) {
    try {
        const { username, password } = await req.json();

        console.log("username: ", username);
        console.log("password: ", password);

        // Fetch the user's email based on the provided username
        const { data: userProfile, error: userProfileError } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('username', username)
            .single();

        if (userProfileError) {
            console.error("Error fetching user profile: ", userProfileError);
            return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
        }

        const { email, id } = userProfile;

        // Authenticate the user using the email and password
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (authError) {
            console.error("Login failed: ", authError);
            return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
        }

        console.log("Login successful, user data: ", userProfile);

        // Return success response with user profile and session details
        return NextResponse.json(
            { 
                success: true, 
                message: "Login successful!", 
                user: { id, email }, 
                session: authData 
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Unexpected error: ", error);
        return NextResponse.json({ error: "An unexpected error occurred during login" }, { status: 500 });
    }
}
