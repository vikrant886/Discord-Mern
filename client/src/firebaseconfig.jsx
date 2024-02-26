// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2XusyeePKJv8D6frRLEgYk32Hd61QzYs",
  authDomain: "discord-clone-4c15f.firebaseapp.com",
  projectId: "discord-clone-4c15f",
  storageBucket: "discord-clone-4c15f.appspot.com",
  messagingSenderId: "292924829649",
  appId: "1:292924829649:web:4d2519608c51a0a7cfbaf0",
  measurementId: "G-0Y6ZK13CN0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);