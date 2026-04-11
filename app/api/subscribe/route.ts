import { NextResponse } from "next/server";

const GOOGLE_SHEET_URL =
  "https://script.google.com/macros/s/AKfycbzxNy7izhXXpRMFc4wrgG2DqD_ZHco-_jDgAxCMmY2Y-E_MZ6oAGeYqA5YYQZT5vN_Muw/exec";

export async function POST(req: Request) {
  const { firstName, lastName, email } = await req.json();

  if (!firstName || !lastName || !email) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  try {
    await fetch(GOOGLE_SHEET_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, email }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Google Sheets error:", error);
    return NextResponse.json({ error: "Failed to save subscriber" }, { status: 500 });
  }
}
