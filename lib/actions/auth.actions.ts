"use server";

import { db, auth } from "@/firebase/admin";
import { cookies } from "next/headers";

const ONE_WEEK = 60 * 60 * 24 * 7;
export async function signUp(params: SignUpParams) {
  const { uid, name, email, password } = params;
  try {
    // sign user up
    const userRecord = await db.collection("users").doc(uid).get();
    // already existed
    if (userRecord.exists) {
      return {
        success: false,
        message: "User is already existed",
      };
    }
    //not existed
    await db.collection("users").doc(uid).set({
      name: name,
      email: email,
    });

    return {
      success: true,
      message: "User created successfully. Please sign in.",
    };
  } catch (e: any) {
    console.error("err creating the user", e);
    if (e.code === "auth/email-already-exists") {
      return {
        success: false,
        message: "This email is already existed",
      };
    }

    return {
      success: false,
      message: "Failed to create new user",
    };
  }
}

export async function signIn(params: SignInParams) {
  const { email, idToken } = params;

  try {
    const userRecord = await auth.getUserByEmail(email);

    if (!userRecord) {
      return {
        success: false,
        message: "User does not exist. Please create an account first.",
      };
    }

    await setSessionCookie(idToken);
  } catch (e) {
    console.error(e);

    return {
      success: false,
      message: "Failed to log in",
    };
  }
}

export async function setSessionCookie(idToken: string) {
  const cookiesStore = await cookies();
  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: ONE_WEEK * 1000,
  });

  cookiesStore.set("session", sessionCookie, {
    maxAge: ONE_WEEK,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });
}

export async function getCurrentSigninUser(): Promise<User | null> {
  const cookieStore = await cookies();

  const cookieSession = cookieStore.get("session")?.value;

  // if no session cookie exist
  if (!cookieSession) return null;

  // case yes
  try {
    const decodedClaim = await auth.verifySessionCookie(cookieSession, true);
    const userRecord = await db.collection("users").doc(decodedClaim.uid).get();
    if (!userRecord) {
      return null;
    }

    return {
      ...userRecord.data(),
      id: userRecord.id,
    } as User;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function isAuthenticated() {
  const user = await getCurrentSigninUser();
  return !!user;
}
