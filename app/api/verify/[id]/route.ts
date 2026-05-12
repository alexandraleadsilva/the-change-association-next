import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const result = await sql`
      SELECT id, full_name, credential, issued_date, expiry_date, status
      FROM certifications WHERE id = ${id}
    `;

    if (result.rows.length === 0) {
      return NextResponse.json({ found: false });
    }

    return NextResponse.json({ found: true, certification: result.rows[0] });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
