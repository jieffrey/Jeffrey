import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer"

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `New message from ${name} — Jeffrey Studios`,
      html: `
        <div style="font-family: sans-serif; max-width: 480px; padding: 24px; border: 1px solid #e5e5e5; border-radius: 12px;">
          <h2 style="margin: 0 0 16px; font-size: 18px; color: #171717;">New Contact Message</h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 8px 0; color: #737373; width: 80px;">Name</td>
              <td style="padding: 8px 0; color: #171717; font-weight: 500;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #737373;">Email</td>
              <td style="padding: 8px 0; color: #171717; font-weight: 500;">${email}</td>
            </tr>
          </table>
          <hr style="margin: 16px 0; border: none; border-top: 1px solid #e5e5e5;" />
          <p style="margin: 0; font-size: 14px; color: #404040; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          <p style="margin: 24px 0 0; font-size: 12px; color: #a3a3a3;">Sent from jeffreystudios.vercel.app</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json(
      { error: "Failed to send email." },
      { status: 500 }
    );
  }
}