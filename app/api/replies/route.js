import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req) {
  try {
    const { contactId, message } = await req.json();

    if (!contactId || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const collection = db.collection("contacts");

    const reply = {
      id: Date.now(),
      message,
      sentAt: new Date(),
    };

    await collection.updateOne(
      { _id: new ObjectId(contactId) },
      {
        $push: { replies: reply },
        $set: { status: "replied" },
      }
    );

    return NextResponse.json({ success: true, reply });
  } catch (err) {
    console.error("Reply error:", err);
    return NextResponse.json({ error: "Failed to add reply" }, { status: 500 });
  }
}
