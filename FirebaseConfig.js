// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZbsBerioYoAWr4KWXgsOwLcEwzE5Ykqk",
  authDomain: "sevens-72cb9.firebaseapp.com",
  projectId: "sevens-72cb9",
  storageBucket: "sevens-72cb9.appspot.com",
  messagingSenderId: "323061027026",
  appId: "1:323061027026:web:cb7866a9ea380338e61d0b"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);