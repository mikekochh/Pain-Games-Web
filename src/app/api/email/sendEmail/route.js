import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabaseServer";
import formData from "form-data";
import Mailgun from "mailgun.js";

const mailgun = new Mailgun(formData);

const DOMAIN = process.env.MAILGUN_DOMAIN;
const API_KEY = process.env.MAILGUN_API_KEY;
const mg = mailgun.client({ username: "api", key: API_KEY });

export async function POST(req) {
    try {
        const { email } = await req.json();

        // Validate email input
        if (!email) {
            return NextResponse.json({ error: "Email address is required" }, { status: 400 });
        }

        // Send email using Mailgun
        const emailData = {
            from: "Pain Games <no-reply@thepaingames.com>",
            to: email,
            subject: "Welcome to Hell",
            text: "This is a test email sent from Mailgun and your Next.js app!",
        };

        await mg.messages.create(DOMAIN, emailData);

        // Update the Supabase table
        const { data, error } = await supabase
            .from("emails")
            .update({ email_sent: true })
            .eq("email", email);

        if (error) {
            console.error("Error updating Supabase:", error);
            return NextResponse.json({ error: "Failed to update email status" }, { status: 500 });
        }

        return NextResponse.json({ message: "Email sent successfully and database updated", data });

    } catch (error) {
        console.error("There was an error:", error);
        return NextResponse.json({ error: "An error occurred when sending email" }, { status: 500 });
    }
}
