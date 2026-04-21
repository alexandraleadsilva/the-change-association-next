import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ projects: [] });
  }

  // Get project names from both the project_name column and from inside the JSONB data
  const { rows } = await sql`
    SELECT DISTINCT COALESCE(
      NULLIF(data->>'projectName', ''),
      NULLIF(project_name, '')
    ) as name
    FROM tool_data
    WHERE user_email = ${session.email}
    AND (
      (data->>'projectName' IS NOT NULL AND data->>'projectName' != '')
      OR (project_name IS NOT NULL AND project_name != '')
    )
    ORDER BY name ASC
  `;

  return NextResponse.json({ projects: rows.map((r) => r.name).filter(Boolean) });
}
