import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";

// Auth
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

// Firestore
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  query,
  where
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCSpkBMEnocIJMG2s-6bm2_LkvwprWG0Eo",
  authDomain: "fullstack-quiz-app-2004.firebaseapp.com",
  projectId: "fullstack-quiz-app-2004",
  storageBucket: "fullstack-quiz-app-2004.firebasestorage.app",
  messagingSenderId: "473358701102",
  appId: "1:473358701102:web:4be79fee3ae00947b6c5bf",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

export {
  app,
  auth,
  createUserWithEmailAndPassword,
  db,
  doc,
  setDoc,
  signInWithEmailAndPassword,
  getDoc,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  query,
  where
};
