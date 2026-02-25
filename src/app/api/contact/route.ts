import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { siteConfig } from "@/content/projects";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not set");
      return NextResponse.json(
        { error: "Contact form is not configured. Please try emailing directly." },
        { status: 503 }
      );
    }

    const { error } = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: siteConfig.email,
      replyTo: email,
      subject: `Contact from ${name} (${email})`,
      text: message,
      html: `<p><strong>From:</strong> ${name} &lt;${email}&gt;</p><p><strong>Message:</strong></p><p>${message.replace(/\n/g, "<br>")}</p>`,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send message. Please try emailing directly." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Contact API error:", e);
    return NextResponse.json(
      { error: "Something went wrong. Please try again or email directly." },
      { status: 500 }
    );
  }
}
