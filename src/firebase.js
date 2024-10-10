import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, query, updateDoc, where } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDycaioH9Wv9XnBszoXFVgsTUJSeWORV5I",
  authDomain: "proyectf-21b95.firebaseapp.com",
  projectId: "proyectf-21b95",
  storageBucket: "proyectf-21b95.appspot.com",
  messagingSenderId: "354072610928",
  appId: "1:354072610928:web:b520df2055db6592310cb5"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

const auth = getAuth(app);

export { addDoc, auth, collection, deleteDoc, doc, firestore, getDocs, query, signInWithEmailAndPassword, signOut, updateDoc, where };

