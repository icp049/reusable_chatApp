import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB9cr2a-9YC6n6nz7wec-rry45b9YtnR8I",
    authDomain: "chatapplication-55a9a.firebaseapp.com",
    projectId: "chatapplication-55a9a",
    storageBucket: "chatapplication-55a9a.appspot.com",
    messagingSenderId: "1067539947567",
    appId: "1:1067539947567:web:cdb53825fdb186e0efa6da",
    measurementId: "G-YKSRE5VPP5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()