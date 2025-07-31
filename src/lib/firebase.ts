import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

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

// Auth példány TypeScript típusokkal
export const auth: Auth = getAuth(app);

// Firestore példány TypeScript típusokkal
export const db: Firestore = getFirestore(app);
