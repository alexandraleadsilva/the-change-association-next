import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ projects: [] });
  }

  const { rows } = await sql`
    SELECT DISTINCT project_name
    FROM tool_data
    WHERE user_email = ${session.email}
    AND project_name != ''
    ORDER BY project_name ASC
  `;

  return NextResponse.json({ projects: rows.map((r) => r.project_name) });
}
