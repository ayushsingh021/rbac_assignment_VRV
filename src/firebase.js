// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getFirestore} from "firebase/firestore" 

const firebaseConfig = {
  apiKey: "AIzaSyCB_WBAVK2dNwtjEVgPlYKUyOmGyY0vlfw",
  authDomain: "rbac-assignment.firebaseapp.com",
  projectId: "rbac-assignment",
  storageBucket: "rbac-assignment.firebasestorage.app",
  messagingSenderId: "829915050119",
  appId: "1:829915050119:web:c730baed72a374cb300822",
  measurementId: "G-DP7Y940L2M"
};


initializeApp(firebaseConfig);
export const db = getFirestore();