import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

// GET /api/contacts
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const contacts = await db.collection("contacts").find({}).sort({ submittedAt: -1 }).toArray();

    return NextResponse.json(contacts, { status: 200 });
  } catch (err) {
    console.error("GET error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST /api/contacts
export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const body = await req.json();

    const newContact = {
      ...body,
      submittedAt: new Date(),
      status: "new",
      replies: [],
    };

    const result = await db.collection("contacts").insertOne(newContact);

    return NextResponse.json(
      { success: true, contact: { ...newContact, _id: result.insertedId } },
      { status: 200 }
    );
  } catch (err) {
    console.error("POST error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
