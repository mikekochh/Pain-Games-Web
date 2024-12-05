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

        const lowerCaseEmail = email.toLowerCase();

        // Send email using Mailgun
        const emailData = {
            from: "Pain Games <no-reply@thepaingames.com>",
            to: lowerCaseEmail,
            subject: "Welcome to Hell",
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; background-color: #000; color: #FF0000; padding: 20px;">
                    <h1 style="text-align: center; color: #FF4500; font-size: 36px; text-transform: uppercase; margin-bottom: 10px;">
                        Welcome to Hell
                    </h1>
                    <p style="text-align: center; font-size: 18px; margin-bottom: 30px; color: #FFA500;">
                        The Pain Games await. Prepare for glory.
                    </p>
                    <div style="background-color: #111; padding: 20px; border-radius: 8px;">
                        <p style="margin-bottom: 20px; font-size: 16px; color: #FFF;">
                            <strong>Welcome Gladiator,</strong>
                        </p>
                        <p style="margin-bottom: 20px; font-size: 16px; color: #FFF;">
                            You’ve stepped into the colosseum. This isn’t just another app. This is 
                            <span style="color: #FF4500; font-weight: bold;">The Pain Games</span> - the ultimate test of grit, power, and your will to dominate. 
                            Here, you’ll compete with warriors around the globe, challenge your friends, and crush your own limits.
                        </p>
                        <p style="margin-bottom: 20px; font-size: 16px; color: #FFF;">
                            There’s no backing down now. Once the Pain Games are launched, you’ll be the first to know. 
                            Until then, prepare your mind, your body, and your soul. 
                            The competition will be fierce. The suffering will be real. The glory will be eternal.
                        </p>
                        <p style="margin-bottom: 20px; font-size: 16px; color: #FFF;">
                            Here’s the truth: the weak will not survive. But for those who embrace the pain? 
                            The gains are waiting.
                        </p>
                        <p style="margin-bottom: 30px; font-size: 16px; color: #FFF;">
                            Stay ready. The Pain Games are coming.
                        </p>
                        <p style="margin-bottom: 20px; font-size: 16px; color: #FFF;">
                            And you’ve just earned your place in the colosseum.
                        </p>
                        <p style="font-size: 16px; color: #FFF; text-align: right;">
                            Stay strong, <br>
                            <span style="color: #FF4500; font-weight: bold;">The Pain Games Team</span>
                        </p>
                    </div>
                    <footer style="margin-top: 30px; text-align: center; font-size: 14px; color: #777; font-style: italic;">
                        “Embrace the pain, reap the gains”
                    </footer>
                </div>
            `,
        };        


        await mg.messages.create(DOMAIN, emailData);

        // Update the Supabase table
        const { data, error } = await supabase
            .from("emails")
            .update({ email_sent: true })
            .eq("email", lowerCaseEmail);

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
