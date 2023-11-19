
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyD0ypGXj3BoO9Y_Mx6PynZuowK-dapKVqg",
  authDomain: "expense-tracker-52eaa.firebaseapp.com",
  projectId: "expense-tracker-52eaa",
  storageBucket: "expense-tracker-52eaa.appspot.com",
  messagingSenderId: "200993421719",
  appId: "1:200993421719:web:c3ca3d541e51f7344aecd2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);