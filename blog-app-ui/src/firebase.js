import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAnfVbeeqMXO-dNk933SLVFzeH1h1pT6Lw",
    authDomain: "blog---app-a7ea0.firebaseapp.com",
    projectId: "blog---app-a7ea0",
    storageBucket: "blog---app-a7ea0.appspot.com",
    messagingSenderId: "450480807259",
    appId: "1:450480807259:web:cabdf679cc2a6b0db34e7e",
    measurementId: "G-BZ3YEVVXYK"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);