import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabaseServer";
import requestIp from 'request-ip';
import axios from "axios";

export async function POST(req) {
    try {
        const { sessionLength } = await req.json();

        let clientIp = requestIp.getClientIp(req);

        // Fallback options for IP if requestIp fails
        if (!clientIp) {
            clientIp = req.headers.get('x-forwarded-for')?.split(',')[0] || 
                        req.headers.get('x-real-ip') || 
                        req.headers.get('cf-connecting-ip'); // Cloudflare specific header
        }

        const geoData = await axios.get(`https://ipinfo.io/${clientIp}?token=ef0ca1e947eb04`);

        const { region, country, city } = geoData.data;

        const location = city + ", " + region + " " + country;

        const viewDate = new Date();

        const { data, error } = await supabase
            .from("views")
            .insert([{
                session_length: sessionLength,
                location,
                created_at: viewDate
            }]);

        if (error) {
            console.log("error tracking view: ", error);
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error('There was an error tracking the user view: ', error);
        return NextResponse.json({ succces: false }, { status: 500 });
    }
}