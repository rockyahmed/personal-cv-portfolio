import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    // Basic validation
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_APP_PASSWORD;
    const contactTo = process.env.CONTACT_TO ?? gmailUser;

    if (!gmailUser || !gmailPass) {
      console.error("Missing GMAIL_USER or GMAIL_APP_PASSWORD in .env.local");
      return NextResponse.json(
        { error: "Server email configuration is missing." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: gmailUser, pass: gmailPass },
    });

    // Email delivered to your inbox
    await transporter.sendMail({
      from: `"Portfolio Contact" <${gmailUser}>`,
      to: contactTo,
      replyTo: `"${name}" <${email}>`,
      subject: subject?.trim() || `New message from ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:auto">
          <h2 style="border-bottom:2px solid #6366f1;padding-bottom:8px;color:#111">
            New Contact Form Message
          </h2>
          <table style="width:100%;border-collapse:collapse;margin:16px 0">
            <tr>
              <td style="padding:8px 12px;background:#f5f5f5;font-weight:600;width:120px">Name</td>
              <td style="padding:8px 12px">${name}</td>
            </tr>
            <tr>
              <td style="padding:8px 12px;background:#f5f5f5;font-weight:600">Email</td>
              <td style="padding:8px 12px"><a href="mailto:${email}">${email}</a></td>
            </tr>
            ${
              subject?.trim()
                ? `<tr>
              <td style="padding:8px 12px;background:#f5f5f5;font-weight:600">Subject</td>
              <td style="padding:8px 12px">${subject}</td>
            </tr>`
                : ""
            }
          </table>
          <div style="background:#fafafa;border-left:4px solid #6366f1;padding:16px;white-space:pre-wrap">
            ${message.replace(/\n/g, "<br>")}
          </div>
          <p style="color:#888;font-size:12px;margin-top:24px">
            Sent from your portfolio contact form · Reply to this email goes directly to ${email}
          </p>
        </div>
      `,
    });

    // Auto-reply to the sender
    await transporter.sendMail({
      from: `"Md. Al-Amin" <${gmailUser}>`,
      to: email,
      subject: "Thanks for reaching out!",
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:auto">
          <h2 style="color:#111">Hi ${name},</h2>
          <p>Thanks for getting in touch! I've received your message and will get back to you as soon as possible.</p>
          <blockquote style="border-left:4px solid #6366f1;padding:12px 16px;background:#f5f5f5;color:#555;white-space:pre-wrap">
            ${message.replace(/\n/g, "<br>")}
          </blockquote>
          <p>Best regards,<br><strong>Md. Al-Amin</strong><br>Front-End Developer</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
  }
}
