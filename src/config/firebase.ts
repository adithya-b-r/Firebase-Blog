import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDotscF9kHO9XdfOWwH00MMrlbMvGhnfEg",
  authDomain: "pedro-react-15aa8.firebaseapp.com",
  projectId: "pedro-react-15aa8",
  storageBucket: "pedro-react-15aa8.appspot.com",
  messagingSenderId: "183528159061",
  appId: "1:183528159061:web:d987a4f61c047e538f61dc"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);