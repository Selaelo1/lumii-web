// src/config/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// CORRECT CONFIG - Copy this exactly!
const firebaseConfig = {
  apiKey: "AIzaSyBTYZTDTLWdKGcgn84iljNOmdyYaMLQets",  // ← FIXED!
  authDomain: "lumii-web-6259f.firebaseapp.com",
  projectId: "lumii-web-6259f",
  storageBucket: "lumii-web-6259f.firebasestorage.app",
  messagingSenderId: "309422442608",
  appId: "1:309422442608:web:96b07b4e7d92fccf0a8cb5",
  measurementId: "G-098VZEYWFL"
};

console.log('🔥 Firebase Config Loaded with CORRECT API key');

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);