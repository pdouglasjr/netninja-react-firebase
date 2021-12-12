// Import the functions you need from the SDKs you need

import firebase from "firebase/app";

// firestore services
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBxaJZrrd8EX62596g5vlwzRoiCUuqHyFU",
  authDomain: "finance-tracker-60819.firebaseapp.com",
  projectId: "finance-tracker-60819",
  storageBucket: "finance-tracker-60819.appspot.com",
  messagingSenderId: "124010323377",
  appId: "1:124010323377:web:631222887bf55684d4b190"
};


// initialize firebase
firebase.initializeApp(firebaseConfig);

// initialize services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

export { projectFirestore, projectAuth };