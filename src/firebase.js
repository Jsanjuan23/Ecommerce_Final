// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, where, query, doc, updateDoc, deleteDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDycaioH9Wv9XnBszoXFVgsTUJSeWORV5I",
  authDomain: "proyectf-21b95.firebaseapp.com",
  projectId: "proyectf-21b95",
  storageBucket: "proyectf-21b95.appspot.com",
  messagingSenderId: "354072610928",
  appId: "1:354072610928:web:b520df2055db6592310cb5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

// Exportar las funciones necesarias
export { firestore, collection, getDocs, addDoc, where, query, doc, updateDoc, deleteDoc };
