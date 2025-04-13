import { initializeApp,getApp,getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAawI2DXOry8m0NB-ojEnD804D09te3H4I",
  authDomain: "mockinterviewapp-22d2d.firebaseapp.com",
  projectId: "mockinterviewapp-22d2d",
  storageBucket: "mockinterviewapp-22d2d.firebasestorage.app",
  messagingSenderId: "907284158434",
  appId: "1:907284158434:web:f916d001f331d80f62cbbb",
  measurementId: "G-NS0Y2BGVFX"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth=getAuth(app);
export const db=getFirestore(app);
