import { connectToDatabase } from "../../../lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { friendId,tributeId,question, answer, createdAt } = await req.json();

    // Validate the data
    if (!question || !answer || !createdAt) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // Connect to MongoDB
    const { db } = await connectToDatabase();

    // Insert the answer into the openEndedAnswers collection
    const result = await db.collection("openEndedAnswers").insertOne({
      friendId,
      tributeId,
      question,
      answer,
      createdAt,
      updatedAt: createdAt, // Set updatedAt to createdAt initially
    });

    return NextResponse.json({ message: "Answer saved successfully", data: result }, { status: 200 });
  } catch (error) {
    console.error("Error saving answer:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}