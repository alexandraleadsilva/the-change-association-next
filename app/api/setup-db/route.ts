import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Users table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        last_login TIMESTAMP DEFAULT NOW()
      )
    `;

    // Tool data table - stores all tool types as JSON
    await sql`
      CREATE TABLE IF NOT EXISTS tool_data (
        id SERIAL PRIMARY KEY,
        user_email VARCHAR(255) NOT NULL,
        tool_type VARCHAR(100) NOT NULL,
        project_name VARCHAR(255) DEFAULT '',
        data JSONB NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW(),
        UNIQUE(user_email, tool_type, project_name)
      )
    `;

    // Index for fast lookups
    await sql`
      CREATE INDEX IF NOT EXISTS idx_tool_data_user ON tool_data(user_email)
    `;

    await sql`
      CREATE INDEX IF NOT EXISTS idx_tool_data_type ON tool_data(user_email, tool_type)
    `;

    // OTP codes table
    await sql`
      CREATE TABLE IF NOT EXISTS otp_codes (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        code VARCHAR(6) NOT NULL,
        expires_at TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;

    await sql`
      CREATE INDEX IF NOT EXISTS idx_otp_email ON otp_codes(email)
    `;

    // Certifications table
    await sql`
      CREATE TABLE IF NOT EXISTS certifications (
        id VARCHAR(12) PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        credential VARCHAR(255) NOT NULL,
        issued_date DATE NOT NULL,
        expiry_date DATE,
        status VARCHAR(20) DEFAULT 'active',
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;

    return NextResponse.json({ success: true, message: "Tables created" });
  } catch (error) {
    console.error("DB setup error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
