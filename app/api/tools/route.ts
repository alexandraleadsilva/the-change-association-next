import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

// GET: Load tool data for the current user
export async function GET(req: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const toolType = searchParams.get("tool");

  if (!toolType) {
    // Return all tools for this user (for dashboard)
    const { rows } = await sql`
      SELECT tool_type, project_name, data, updated_at
      FROM tool_data
      WHERE user_email = ${session.email}
      ORDER BY updated_at DESC
    `;
    return NextResponse.json({ tools: rows });
  }

  // Return most recent data for this tool type
  const { rows } = await sql`
    SELECT data, project_name, updated_at
    FROM tool_data
    WHERE user_email = ${session.email}
    AND tool_type = ${toolType}
    ORDER BY updated_at DESC
    LIMIT 1
  `;

  if (rows.length === 0) {
    return NextResponse.json({ data: null });
  }

  return NextResponse.json({ data: rows[0].data, updatedAt: rows[0].updated_at });
}

// POST: Save tool data for the current user
export async function POST(req: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { toolType, projectName = "", data } = await req.json();

  if (!toolType || !data) {
    return NextResponse.json({ error: "toolType and data required" }, { status: 400 });
  }

  // Upsert by user + tool type (one save per tool per user for now)
  const { rows: existing } = await sql`
    SELECT id FROM tool_data
    WHERE user_email = ${session.email}
    AND tool_type = ${toolType}
    LIMIT 1
  `;

  if (existing.length > 0) {
    await sql`
      UPDATE tool_data
      SET data = ${JSON.stringify(data)}, project_name = ${projectName}, updated_at = NOW()
      WHERE id = ${existing[0].id}
    `;
  } else {
    await sql`
      INSERT INTO tool_data (user_email, tool_type, project_name, data, updated_at)
      VALUES (${session.email}, ${toolType}, ${projectName}, ${JSON.stringify(data)}, NOW())
    `;
  }

  // Upsert user record
  await sql`
    INSERT INTO users (email, last_login)
    VALUES (${session.email}, NOW())
    ON CONFLICT (email)
    DO UPDATE SET last_login = NOW()
  `;

  return NextResponse.json({ success: true });
}

// DELETE: Remove tool data
export async function DELETE(req: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const toolType = searchParams.get("tool");

  if (!toolType) {
    return NextResponse.json({ error: "tool parameter required" }, { status: 400 });
  }

  await sql`
    DELETE FROM tool_data
    WHERE user_email = ${session.email}
    AND tool_type = ${toolType}
  `;

  return NextResponse.json({ success: true });
}
