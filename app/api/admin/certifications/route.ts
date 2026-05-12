import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

function generateId(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let id = "TCA-";
  for (let i = 0; i < 8; i++) id += chars[Math.floor(Math.random() * chars.length)];
  return id;
}

export async function POST(req: NextRequest) {
  const key = req.nextUrl.searchParams.get("key");
  if (key !== process.env.AUTH_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { full_name, credential, issued_date, expiry_date } = body;

    if (!full_name || !credential || !issued_date) {
      return NextResponse.json({ error: "full_name, credential, and issued_date are required" }, { status: 400 });
    }

    const id = generateId();

    await sql`
      INSERT INTO certifications (id, full_name, credential, issued_date, expiry_date)
      VALUES (${id}, ${full_name}, ${credential}, ${issued_date}, ${expiry_date || null})
    `;

    return NextResponse.json({
      success: true,
      id,
      verify_url: `https://thechangeassociation.com/verify/${id}`,
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get("key");
  if (key !== process.env.AUTH_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const certs = await sql`SELECT * FROM certifications ORDER BY created_at DESC`;
    return NextResponse.json({ certifications: certs.rows });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
