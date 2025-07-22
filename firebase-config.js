// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCwF_UsB__iNveTCWAMlqJ5QnqHF72HuNI",
  authDomain: "abide-in-my-love.firebaseapp.com",
  projectId: "abide-in-my-love",
  storageBucket: "abide-in-my-love.firebasestorage.app",
  messagingSenderId: "1082259868186",
  appId: "1:1082259868186:web:c7c0e67241251413605fa3",
  measurementId: "G-V5B9XL15N6"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
