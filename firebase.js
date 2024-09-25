// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

import "firebase/compat/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDn5tc54fVK5krxL2B9fiYnRLjd3oZMJWs",
  authDomain: "euphony-70379.firebaseapp.com",
  projectId: "euphony-70379",
  storageBucket: "euphony-70379.appspot.com",
  messagingSenderId: "996782198917",
  appId: "1:996782198917:web:fbb89f4c3f3db5b76199ec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export{db}