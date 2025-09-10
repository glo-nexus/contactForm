// app/api/admin-login/route.js (or pages/api/admin-login.js)
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { password } = await req.json();

    // Compare with environment variable, never hardcode passwords
    if (password === process.env.ADMIN_PASSWORD) {
      // Return a simple token (or better, use JWT for real apps)
      return NextResponse.json({ success: true, token: "admin-token-placeholder" });
    } else {
      return NextResponse.json({ success: false, error: "Invalid password" }, { status: 401 });
    }
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
