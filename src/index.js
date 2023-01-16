import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCFA0cJ6_kG5BG1UzkAxln3H22_6vyG_BM",
  authDomain: "react-village.firebaseapp.com",
  projectId: "react-village",
  storageBucket: "react-village.appspot.com",
  messagingSenderId: "718738113472",
  appId: "1:718738113472:web:3951787f64c3a9c057be25",
  measurementId: "G-CETC9GMGKK",
};

const app = initializeApp(firebaseConfig);

export const Context = createContext(null);
const auth = getAuth(app);
const firestore = getFirestore(app);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Context.Provider
    value={{
      firebase,
      auth,
      firestore,
    }}
  >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Context.Provider>
);
