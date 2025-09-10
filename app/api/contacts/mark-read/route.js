import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req) {
  try {
    const { contactId } = await req.json();

    if (!contactId) {
      return NextResponse.json({ error: "Missing contactId" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const collection = db.collection("contacts");

    await collection.updateOne(
      { _id: new ObjectId(contactId) },
      { $set: { status: "read" } }
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Mark-read error:", err);
    return NextResponse.json({ error: "Failed to mark as read" }, { status: 500 });
  }
}
