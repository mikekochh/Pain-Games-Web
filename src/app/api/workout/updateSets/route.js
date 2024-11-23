import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabaseServer";

export async function POST(req) {
    try {
        const { updatedSets } = await req.json();

        // Validate input data
        if (!Array.isArray(updatedSets)) {
            return NextResponse.json({ error: 'Missing or invalid input data' }, { status: 400 });
        }

        console.log("updatedSets: ", updatedSets);

        // Iterate through updatedSets and update each one in the database
        const updatePromises = updatedSets.map(async (set) => {
            const { id, weight, reps } = set;

            // Validate that necessary fields exist
            if (!id || weight == null || reps == null) {
                console.log(`Skipping invalid set: ${JSON.stringify(set)}`);
                return { success: false, id, error: "Missing required fields" };
            }

            const { error } = await supabase
                .from('sets')
                .update({ weight, reps })
                .eq('id', id);

            if (error) {
                console.error(`Error updating set with id ${id}: `, error);
                return { success: false, id, error: error.message };
            }

            return { success: true, id };
        });

        // Wait for all updates to complete
        const results = await Promise.all(updatePromises);

        // Collect success and error stats
        const successfulUpdates = results.filter(result => result.success).map(result => result.id);
        const failedUpdates = results.filter(result => !result.success);

        if (failedUpdates.length > 0) {
            console.warn("Some updates failed: ", failedUpdates);
        }

        return NextResponse.json({
            message: "Sets update process completed",
            successfulUpdates,
            failedUpdates
        }, { status: 200 });
    } catch (err) {
        console.error("Unexpected error: ", err);
        return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
    }
}
