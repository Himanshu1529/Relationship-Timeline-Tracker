import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAKM9aA4VB713avqSuYsFQ-SK8RAtpFLY",
  authDomain: "friends-timeline.firebaseapp.com",
  projectId: "friends-timeline",
  storageBucket: "friends-timeline.firebasestorage.app",
  messagingSenderId: "752576559569",
  appId: "1:752576559569:web:0d50d8612df2453f4b08f0",
  measurementId: "G-50ZR2KSMPG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, getDocs };
