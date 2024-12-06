import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabaseServer";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const userID = searchParams.get('userID');
        const exerciseID = searchParams.get('exerciseID');

        const { data, error } = await supabase
            .from('user_prs')
            .select('weight')
            .eq('exercise_id', exerciseID)
            .eq('user_id', userID)
            .order('created_at', { ascending: false }) // Sort by the most recent entry
            .limit(1) // Get only the latest record
            .single(); // Ensure a single object is returned
    

        if (error) {
            console.log("There was an error fetching the users exercise max: ", error);
            return NextResponse.error(error);
        }

        return NextResponse.json({ data }, { status: 200 });
    } catch (error) {
        console.error("There was an error: ", error);
        return NextResponse.error(error);
    }
}