// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, doc, getDoc  } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDlHBov3c0jQocSWHy-QlezDuakaU-bDlg",
  authDomain: "recallai-50430.firebaseapp.com",
  projectId: "recallai-50430",
  storageBucket: "recallai-50430.appspot.com",
  messagingSenderId: "248993724547",
  appId: "1:248993724547:web:e6ae97820f37c1cf0243b6",
  measurementId: "G-RQ2L6PLLYP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, setDoc, doc, getDoc };