import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: "AIzaSyDkAu8EB4WwJsYRUJx-XAWE4vPWBIeJAlg",
    authDomain: "solvingforind.firebaseapp.com",
    projectId: "solvingforind",
    storageBucket: "solvingforind.appspot.com",
    messagingSenderId: "295357938280",
    appId: "1:295357938280:web:ea1d82d9344fa38a6619dd",
    measurementId: "G-5XQ1CF977S"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

