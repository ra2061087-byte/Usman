
import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;

// This will be populated from firebase-applet-config.json if it existed,
// but since set_up_firebase failed, we'll try to use env vars or fail gracefully.
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

export const getFirebaseApp = () => {
  if (!app) {
    if (!firebaseConfig.apiKey) {
      console.warn("Firebase API Key is missing. Some features may not work.");
      return null;
    }
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  }
  return app;
};

export const getFirebaseAuth = () => {
  const app = getFirebaseApp();
  if (!app) return null;
  if (!auth) auth = getAuth(app);
  return auth;
};

export const getFirebaseDb = () => {
  const app = getFirebaseApp();
  if (!app) return null;
  if (!db) db = getFirestore(app);
  return db;
};
