import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get("key");
  if (key !== process.env.AUTH_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const users = await sql`SELECT id, email, created_at, last_login FROM users ORDER BY created_at DESC`;
    const toolCounts = await sql`SELECT tool_type, COUNT(*) as count FROM tool_data GROUP BY tool_type ORDER BY count DESC`;
    const recentSaves = await sql`SELECT user_email, tool_type, project_name, updated_at FROM tool_data ORDER BY updated_at DESC LIMIT 20`;
    const totalSaves = await sql`SELECT COUNT(*) as total FROM tool_data`;

    return NextResponse.json({
      total_users: users.rows.length,
      users: users.rows,
      total_tool_saves: totalSaves.rows[0]?.total ?? 0,
      tools_by_type: toolCounts.rows,
      recent_activity: recentSaves.rows,
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
