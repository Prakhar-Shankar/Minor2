
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBXvib32kE2MUmpFr3ycF4L8efnUpoHJYY",
  authDomain: "minor-36da5.firebaseapp.com",
  databaseURL: "https://minor-36da5-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "minor-36da5",
  storageBucket: "minor-36da5.appspot.com",
  messagingSenderId: "819322081883",
  appId: "1:819322081883:web:1c7888c35cf4ddf268e57e",
  measurementId: "G-DBPM61B5CX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { app, auth, firestore };


