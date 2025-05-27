// clientApp.ts
import firebase from "firebase/compat/app";
import "firebase/auth";
import "firebase/compat/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey:
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
    "AIzaSyAdL4k2vFjyRfscMTVs5p5bMuUm6qrvx9k",
  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
    "nextjs-firebase-1fa76.firebaseapp.com",
  projectId:
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "nextjs-firebase-1fa76",
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
    "nextjs-firebase-1fa76.firebasestorage.app",
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "142616369621",
  appId:
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID ||
    "1:142616369621:web:934dc23aad071134af055c",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
