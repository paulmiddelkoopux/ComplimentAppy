//firebase.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC32RomM5eXdouAt7MZaWkoAOD7CyUogpg",
  authDomain: "glow-ff752.firebaseapp.com",
  projectId: "glow-ff752",
  storageBucket: "glow-ff752.appspot.com",
  messagingSenderId: "268963420060",
  appId: "1:268963420060:web:0a8c23d4d75ceeb5c49a59",
  measurementId: "G-J5Y7T2FHW5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export default app;