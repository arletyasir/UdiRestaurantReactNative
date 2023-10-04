// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCw9u_RIIQTIUeQ8zDDu0OpIpcrczvMuxI",
  authDomain: "coastal-set-387101.firebaseapp.com",
  projectId: "coastal-set-387101",
  storageBucket: "coastal-set-387101.appspot.com",
  messagingSenderId: "1037067241397",
  appId: "1:1037067241397:web:8d379bf06032f0331ffbfc"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);