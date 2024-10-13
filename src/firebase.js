import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, query, updateDoc, where } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAUt4q6sv-H64MZrQbBpIRAcB-DQT4ogV4",
  authDomain: "proyecto-final-a2dd3.firebaseapp.com",
  projectId: "proyecto-final-a2dd3",
  storageBucket: "proyecto-final-a2dd3.appspot.com",
  messagingSenderId: "419114290891",
  appId: "1:419114290891:web:805a4c6db2542dce04d54e"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

const auth = getAuth(app);

export { addDoc, auth, collection, deleteDoc, doc, firestore, getDocs, query, signInWithEmailAndPassword, signOut, updateDoc, where };

