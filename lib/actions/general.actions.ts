import { db } from "@/firebase/admin";

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

  return interview.data() as Interview| null;
}
