// File: app/api/feedback/route.ts
import { NextResponse } from "next/server";
import { createFeedback } from "@/lib/actions/general.actions";

export async function POST(request: Request) {
  const body = await request.json();
  const { interviewId, userId, transcript } = body;

  try {
    const { success, feedbackId } = await createFeedback({
      interviewId,
      userId,
      transcript,
    });

    return NextResponse.json({ success, feedbackId });
  } catch (error) {
    console.error("Error generating feedback:", error);
    return NextResponse.json({ success: false });
  }
}