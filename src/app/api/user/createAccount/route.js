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

        console.log("authData: ", authData);
        return NextResponse.json({ success: true, message: "Account created successfully!", authData }, { status: 200 });
    } catch (error) {
        console.error(err);
        return NextResponse.json({ error: "An unexpected error occurred while creating an account" }, { status: 500 });
    }
}