// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpKRjFAsuke5_s3yTtZvc3DTK6wRxr-g8",
  authDomain: "inventory-management-app-beb37.firebaseapp.com",
  projectId: "inventory-management-app-beb37",
  storageBucket: "inventory-management-app-beb37.appspot.com",
  messagingSenderId: "531464898647",
  appId: "1:531464898647:web:ab61c555a99f17230f3b12",
  measurementId: "G-ZGNYH3Y5JR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);

// Export the initialized Firebase app and Firestore instance
export {firestore, storage};