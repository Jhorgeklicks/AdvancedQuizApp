
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.MODE === 'development' ? 'SET YOUR KEY' : import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.MODE === 'development' ? 'SET YOUR DOMAIN': import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.MODE === 'development' ? 'SET YOUR PROJECTID': import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.MODE === 'development' ? 'SET YOUR STORAGE BUCKET': import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.MODE === 'development' ? 'SET YOUR MESSAGEID': import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.MODE === 'development' ? 'SET YOUR APPID': import.meta.env.VITE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const userAuth = getAuth(app);

export const db = getFirestore(app)
