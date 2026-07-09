import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mernaiproject-5da14.firebaseapp.com",
  projectId: "mernaiproject-5da14",
  storageBucket: "mernaiproject-5da14.firebasestorage.app",
  messagingSenderId: "73137056330",
  appId: "1:73137056330:web:3e491ca7cbd5bbba6454b3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleprovider = new GoogleAuthProvider();