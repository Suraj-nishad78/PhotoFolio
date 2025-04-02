// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  // apiKey: "AIzaSyC3ZnSW8mOtz1bXpD0nKo-EPPweh2QlCB8",
  // authDomain: "fir-intro-62707.firebaseapp.com",
  // projectId: "fir-intro-62707",
  // storageBucket: "fir-intro-62707.firebasestorage.app",
  // messagingSenderId: "687230738104",
  // appId: "1:687230738104:web:94f8d6dfd216b1fef0de4d",
  // measurementId: "G-RSD20LX204"
  apiKey: import.meta.env.VITE_FIR_APIKEY,
  authDomain: import.meta.env.VITE_FIR_AUTHDOMAIN,
  projectId: import.meta.env.VITE_FIR_PROJECTID,
  storageBucket: import.meta.env.VITE_FIR_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_FIR_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_FIR_APPID,
  measurementId: import.meta.env.VITE_FIR_MEASUREMENTID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const albumRef = collection(db, 'album');
export const imageRef = collection(db, "image")