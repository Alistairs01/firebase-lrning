// Import the functions you need from the SDKs you need
// initializeApp is used whenever you want to start a firebase app

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDlXchCXuddEgRjFl35GCOZwwMv5NxxXro",
  authDomain: "fir-test-24702.firebaseapp.com",
  projectId: "fir-test-24702",
  storageBucket: "fir-test-24702.firebasestorage.app",
  messagingSenderId: "1002288324523",
  appId: "1:1002288324523:web:a4a82f565b679c4dd13cee",
  measurementId: "G-50361MGCTY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);