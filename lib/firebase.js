// Firebase Configuration
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCwm0w10uVJUx-c1ibUnSDnqmhMG8pdfUs",
  authDomain: "shreedhar-c51c5.firebaseapp.com",
  projectId: "shreedhar-c51c5",
  storageBucket: "shreedhar-c51c5.firebasestorage.app",
  messagingSenderId: "920028579315",
  appId: "1:920028579315:web:0ee451a837e3bfecb77e86",
  measurementId: "G-PPGZ99DLGY"
};

// Initialize Firebase (only once)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize services
const db = getFirestore(app);
const storage = getStorage(app);

// Analytics (only in browser)
let analytics = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { app, db, storage, analytics };
