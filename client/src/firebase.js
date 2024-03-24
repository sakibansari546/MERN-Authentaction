// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mern-auth-2bd7e.firebaseapp.com",
    projectId: "mern-auth-2bd7e",
    storageBucket: "mern-auth-2bd7e.appspot.com",
    messagingSenderId: "908680880987",
    appId: "1:908680880987:web:289b1f0822c5e26a62b07e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
