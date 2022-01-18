// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1WhZKgIvSxYop_KH6x8zHv2KOTXNxqOk",
  authDomain: "collegemoney-tracker.firebaseapp.com",
  projectId: "collegemoney-tracker",
  storageBucket: "collegemoney-tracker.appspot.com",
  messagingSenderId: "357787781034",
  appId: "1:357787781034:web:aaa5bb3d64475032f2cdd3",
  measurementId: "G-KMN3R1QRT5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
