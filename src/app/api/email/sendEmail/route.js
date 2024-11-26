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
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <h1 style="color: #FF5733; text-align: center;">Welcome to Hell 🔥</h1>
                    <p>Dear User,</p>
                    <p>
                        Thank you for signing up for Pain Games. We’re excited to have you on board!
                        Prepare yourself for an epic adventure.
                    </p>
                    <p style="text-align: center; margin: 20px 0;">
                        <a href="https://thepaingames.com/login" 
                        style="display: inline-block; padding: 10px 20px; background-color: #FF5733; color: #fff; 
                                text-decoration: none; border-radius: 5px; font-weight: bold;">
                            Get Started
                        </a>
                    </p>
                    <p>Stay safe, <br>The Pain Games Team</p>
                    <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
                    <p style="font-size: 12px; color: #777;">
                        If you did not sign up for this account, please ignore this email.
                    </p>
                </div>
            `,
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
