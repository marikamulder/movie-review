// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHmYMFrDnQUbk343HOB59E5lXATaXVC5Y",
  authDomain: "movie-review-a2def.firebaseapp.com",
  projectId: "movie-review-a2def",
  storageBucket: "movie-review-a2def.appspot.com",
  messagingSenderId: "704172825181",
  appId: "1:704172825181:web:774059a955bd97997a4bb4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);