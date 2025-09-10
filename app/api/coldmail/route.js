import nodemailer from "nodemailer";
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

// Helper: chunk an array into smaller pieces
function chunkArray(array, size) {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

export async function POST(req) {
  const { subject, message } = await req.json();

  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    // Get all contacts with emails
    const contacts = await db.collection("contacts").find({ email: { $exists: true } }).toArray();

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const sentEmails = [];

    // Send in batches of 20
    const batches = chunkArray(contacts, 20);

    for (const batch of batches) {
      // Fire off all 20 in parallel
      await Promise.all(
        batch.map(async (contact) => {
          try {
            const htmlContent = `
              <div style="font-family: Arial, sans-serif; line-height:1.6; color:#333;">
                <h2 style="color:#e3342f;">Hello ${contact.firstName || "there"},</h2>
                <p>${message}</p>
                <p style="margin-top:20px;">
                  Best regards,<br/>
                  <strong>Your Company</strong><br/>
                  <a href="https://yourcompany.com" style="color:#e3342f;">Visit our site</a>
                </p>
              </div>
            `;

            await transporter.sendMail({
              from: `"Your Company" <${process.env.EMAIL_USER}>`,
              to: contact.email,
              subject,
              text: message, // fallback
              html: htmlContent,
            });

            // Log to DB
            const coldEmailEntry = {
              to: contact.email,
              subject,
              message,
              sentAt: new Date(),
            };
            const result = await db.collection("coldmails").insertOne(coldEmailEntry);
            sentEmails.push({ ...coldEmailEntry, _id: result.insertedId });
          } catch (err) {
            console.error(`Failed to send to ${contact.email}:`, err.message);
          }
        })
      );

      // Delay between batches (2s to be safe)
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    return NextResponse.json({
      success: true,
      sent: sentEmails.length,
      details: sentEmails,
    });
  } catch (err) {
    console.error("Coldmail error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
