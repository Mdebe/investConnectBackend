import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyDQdJFE3BX5fDDu82T79vYcgmYx6iV9yeM",
  authDomain: "investconnect-a3802.firebaseapp.com",
  projectId: "investconnect-a3802",
  storageBucket: "investconnect-a3802.appspot.com",
  messagingSenderId: "155644706236",
  appId: "1:155644706236:web:71858f50524622e2f3ffb9",
  measurementId: "G-NJ5HSWQC0Z"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
