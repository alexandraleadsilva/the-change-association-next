import { NextResponse } from "next/server";
import { Resend } from "resend";
import { generateOTP, storeOTP } from "@/lib/auth";

const resend = new Resend(process.env.RESEND_API_KEY);

const GOOGLE_SHEET_URL =
  "https://script.google.com/macros/s/AKfycbzxNy7izhXXpRMFc4wrgG2DqD_ZHco-_jDgAxCMmY2Y-E_MZ6oAGeYqA5YYQZT5vN_Muw/exec";

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }

  const code = generateOTP();
  storeOTP(email, code);

  try {
    await resend.emails.send({
      from: "The Change Association <noreply@thechangeassociation.com>",
      to: email,
      subject: `Your sign in code: ${code}`,
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 0;">
          <h2 style="color: #0A1628; font-size: 24px; margin-bottom: 8px;">The Change Association</h2>
          <p style="color: #5C6070; font-size: 15px; line-height: 1.6; margin-bottom: 24px;">
            Enter this code to sign in to your account:
          </p>
          <div style="background: #0A1628; padding: 20px 32px; text-align: center; margin-bottom: 24px;">
            <span style="color: #C4943A; font-size: 32px; font-weight: 600; letter-spacing: 8px;">${code}</span>
          </div>
          <p style="color: #9A9080; font-size: 13px; line-height: 1.5;">
            This code expires in 10 minutes. If you did not request this, you can ignore this email.
          </p>
        </div>
      `,
    });

    // Also save email to Google Sheet for your records
    fetch(GOOGLE_SHEET_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sheetName: "Users",
        firstName: "",
        lastName: "",
        email,
      }),
    }).catch(() => {});

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json({ error: "Failed to send code" }, { status: 500 });
  }
}
