import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    await db.command({ ping: 1 });
    return NextResponse.json({ message: "Mongo connected ✅" });
  } catch (err) {
    console.error("Ping error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
