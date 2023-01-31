// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "nextron-chat-8e83b.firebaseapp.com",
  projectId: "nextron-chat-8e83b",
  storageBucket: "nextron-chat-8e83b.appspot.com",
  messagingSenderId: "739626713094",
  appId: "1:739626713094:web:21b189171a7379b9df4387",
  measurementId: "G-97F19G176J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };