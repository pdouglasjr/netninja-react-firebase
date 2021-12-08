/* import core of firebase */
import firebase from 'firebase/app';

/* import firebase firestore service */
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCe3CLeOVGObJAgp_fVsxd8s2OwgbTNHZY",
  authDomain: "cooking-ninja-site-3f001.firebaseapp.com",
  projectId: "cooking-ninja-site-3f001",
  storageBucket: "cooking-ninja-site-3f001.appspot.com",
  messagingSenderId: "118542475427",
  appId: "1:118542475427:web:9bab0e1fbb190747ec9f16"
};

/* initialize firebase */
firebase.initializeApp(firebaseConfig);

/* initialize services */
const projectFirestore = firebase.firestore(); // must import firestore in order to work

export { projectFirestore };