import { feedbackSchema } from "@/constants";
import { db } from "@/firebase/admin";
import { google } from "@ai-sdk/google";
import { generateObject } from "ai";

export async function getInterviewsByUserId(
  userId: string
): Promise<Interview[] | null> {
  // fetch from db
  const interviews = await db
    .collection("interviews")
    .where("userId", "==", userId)
    .orderBy("date", "desc")
    .get();

  return interviews.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interview[];
}

export async function getLatestInterviews(
  params: GetLatestInterviewsParams
): Promise<Interview[] | null> {
  const { userId, limit = 20 } = params;

  // fetch from db
  const interviews = await db
    .collection("interviews")
    .where("userId", "!=", userId)
    .where("finalized", "==", "true")
    .orderBy("date", "desc")
    .limit(limit)
    .get();

  return interviews.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interview[];
}

export async function getInterviewDetailsById(
  id: string
): Promise<Interview | null> {
  // fetch from db
  const interview = await db.collection("interviews").doc(id).get();

  return interview.data() as Interview | null;
}

export async function createFeedback(params: CreateFeedbackParams) {
  const { userId, interviewId, transcript } = params;

  try {
    const formattedTranscript = transcript
      .map((sentence) => `-${sentence.role}: ${sentence.content}\n`)
      .join("");
    const { object:{totalScore,categoryScores,strengths,areasForImprovement,finalAssessment} } = await generateObject({
      model: google("gemini-2.0-flash-001", { structuredOutputs: false }),
      schema: feedbackSchema,
      prompt: `
        You are an AI interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories. Be thorough and detailed in your analysis. Don't be lenient with the candidate. If there are mistakes or areas for improvement, point them out.
        Transcript:
        ${formattedTranscript}

        Please score the candidate from 0 to 100 in the following areas. Do not add categories other than the ones provided:
        - **Communication Skills**: Clarity, articulation, structured responses.
        - **Technical Knowledge**: Understanding of key concepts for the role.
        - **Problem-Solving**: Ability to analyze problems and propose solutions.
        - **Cultural & Role Fit**: Alignment with company values and job role.
        - **Confidence & Clarity**: Confidence in responses, engagement, and clarity.
        `,
      system: `You are a professional interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories`,
    });

    const feedback=await db.collection('feedbacks').add({
      interviewId,
      userId,
      totalScore,
      categoryScores,
      strengths,
      areasForImprovement,
      finalAssessment,
      createdAt: new Date().toISOString()
    })

    return{
      success:true,
      feedbackId: feedback.id
    }
  } catch (e) {
    console.error("error creating interview feedback", e);
    return{
      success:false
    }
  }
}

export async function getFeedbackByInterviewId(
  params: GetFeedbackByInterviewIdParams
): Promise<Feedback | null> {
  const { interviewId,userId } = params;

  // fetch from db
  const feedback  = await db
    .collection("feedbacks")
    .where("userId", "==", userId)
    .where("interviewId", "==", interviewId)
    .limit(1)
    .get();

  if (feedback.empty) return null
  // get the 1st matching document snapshot
  const feedbackDoc=feedback.docs[0]
  return {
    id: feedbackDoc.id,
    ...feedbackDoc.data()
  } as Feedback


  
}
