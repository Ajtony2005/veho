import { initializeApp, FirebaseApp } from "firebase/app";
import {
  getAuth,
  Auth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB1U1EwlmM_kxG_1BYflfgLOujVyGNRyQA",
  authDomain: "veho-7fea1.firebaseapp.com",
  projectId: "veho-7fea1",
  storageBucket: "veho-7fea1.appspot.com",
  messagingSenderId: "488503249745",
  appId: "1:488503249745:web:91062e506bdb5383d26170",
  measurementId: "G-SVZWH7JQE5",
};

// Inicializáljuk a Firebase appot
export const app: FirebaseApp = initializeApp(firebaseConfig);

// Firebase Auth példány
export const auth: Auth = getAuth(app);

// Firestore példány
export const db: Firestore = getFirestore(app);

// Storage példány
export const storage: FirebaseStorage = getStorage(app);

// Set persistence to LOCAL to maintain auth state across browser sessions
setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error("Error setting auth persistence:", error);
});

export default app;
