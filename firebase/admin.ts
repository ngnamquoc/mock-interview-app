import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const initializeFirebaseAdmin = () => {
  try {
    const apps = getApps();
    if (!apps.length) {
      initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        }),
      });
    }

    return {
      auth: getAuth(),
      db: getFirestore(),
    };
  } catch (error) {
    console.error("Failed to initialize Firebase Admin SDK:", error);
    throw new Error("Firebase Admin initialization failed.");
  }
};

export const { auth, db } = initializeFirebaseAdmin();
