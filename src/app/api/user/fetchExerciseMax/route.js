import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabaseServer";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const userID = searchParams.get('userID');
        const exerciseID = searchParams.get('exerciseID');

        console.log("userID: ", userID);
        console.log("exerciseID: ", exerciseID);

        const { data, error } = await supabase
            .from('exercise_maxes')
            .select('weight_max')
            .eq('exercise_id', exerciseID)
            .eq('user_id', userID)
            .maybeSingle();

        if (error) {
            console.log("There was an error fetching the users exercise max: ", error);
            return NextResponse.error(error);
        }

        console.log("data: ", data);


        return NextResponse.json({ data }, { status: 200 });
    } catch (error) {
        console.error("There was an error: ", error);
        return NextResponse.error(error);
    }
}