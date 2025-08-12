// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCs4OnX1RYu3l4EUkVvFA3QSundYI81Wj0",
  authDomain: "love1another-dd84f.firebaseapp.com",
  projectId: "love1another-dd84f",
  storageBucket: "love1another-dd84f.firebasestorage.app",
  messagingSenderId: "967000488783",
  appId: "1:967000488783:web:3e3b8d77db01fe7c6ce33a",
  measurementId: "G-6JE4L9L5L8"
};
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
