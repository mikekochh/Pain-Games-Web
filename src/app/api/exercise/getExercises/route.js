import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabaseServer';

export async function GET(req) {
    try {
        const { data, error } = await supabase
            .from('exercises')
            .select('*');

        if (error) {
            console.error('There was an error fetching exercises: ', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ data });
    } catch (error) {
        console.log('error: ', error);
        return NextResponse.error(error);
    }
}