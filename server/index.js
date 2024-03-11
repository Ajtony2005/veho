// server/index.js

const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1U1EwlmM_kxG_1BYflfgLOujVyGNRyQA",
  authDomain: "veho-7fea1.firebaseapp.com",
  projectId: "veho-7fea1",
  storageBucket: "veho-7fea1.appspot.com",
  messagingSenderId: "488503249745",
  appId: "1:488503249745:web:91062e506bdb5383d26170",
  measurementId: "G-SVZWH7JQE5"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
