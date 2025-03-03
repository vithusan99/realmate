// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-mate-fa3f7.firebaseapp.com",
  projectId: "real-mate-fa3f7",
  storageBucket: "real-mate-fa3f7.firebasestorage.app",
  messagingSenderId: "348658874951",
  appId: "1:348658874951:web:cecd3b4530909ce541cf62"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);