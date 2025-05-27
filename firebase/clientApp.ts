// clientApp.ts
import firebase from "firebase/compat/app";
import "firebase/auth";
import "firebase/compat/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdL4k2vFjyRfscMTVs5p5bMuUm6qrvx9k",
  authDomain: "nextjs-firebase-1fa76.firebaseapp.com",
  projectId: "nextjs-firebase-1fa76",
  storageBucket: "nextjs-firebase-1fa76.firebasestorage.app",
  messagingSenderId: "142616369621",
  appId: "1:142616369621:web:934dc23aad071134af055c",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
