import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabaseServer";

export async function GET(req) {
    try {

        const pathname = req.nextUrl.pathname;
        const userID = pathname.split('/').pop();

        const { data, error } = await supabase
            .from('workouts')
            .select(`*, sets(*)`)
            .eq('userID', userID);

        console.log("data: ", data);

        if (error) {
            console.log("error fetching workout data for user: ", error);
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json({ data }, { status: 200 });
    } catch (error) {
        console.error(err);
        return NextResponse.json({ error: "An unexpected error occured "}, { status: 500 });
    }
}