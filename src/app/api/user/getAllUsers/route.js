import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabaseServer";

export async function GET(req) {
    try {
        const { data, error } = await supabase
            .from('user_profiles')
            .select(`*`);

        if (error) {
            console.log("error fetching users: ", error);
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json({ data }, { status: 200 });
    } catch (error) {
        console.error(err);
        return NextResponse.json({ error: "An unexpected error occured "}, { status: 500 });
    }
}