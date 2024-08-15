// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBjdrUFiTSzuexFbICraQsK9LiRsgEvdKY",
    authDomain: "multi-connect-chat.firebaseapp.com",
    projectId: "multi-connect-chat",
    storageBucket: "multi-connect-chat.appspot.com",
    messagingSenderId: "302857352593",
    appId: "1:302857352593:web:2634d68bcb4bcee9f95630"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const database = getFirestore();
export const storage = getStorage();
