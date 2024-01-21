// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCnmvCT6Cbd2DkiCPDUAvlEe0gQBCqP_is",
  authDomain: "timegen-b244a.firebaseapp.com",
  projectId: "timegen-b244a",
  storageBucket: "timegen-b244a.appspot.com",
  messagingSenderId: "919326191178",
  appId: "1:919326191178:web:5ad5644b60ccfa242d40b3",
  measurementId: "G-29LV5P5FZD",
};

// Initialize Firebase

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage();
