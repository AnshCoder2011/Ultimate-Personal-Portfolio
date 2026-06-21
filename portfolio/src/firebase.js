// Firebase core
import { initializeApp } from "firebase/app";

// Firestore (this is what we’ll use for REAL analytics)
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
} from "firebase/firestore";

// Optional: Firebase analytics (keep, but not important for custom dashboard)
import { getAnalytics } from "firebase/analytics";

// 🔥 Your config
const firebaseConfig = {
  apiKey: "AIzaSyCeJ4cHptvMHeQDCshL2DjICAUmQPPQRTQ",
  authDomain: "portfolio-analytics-7c75b.firebaseapp.com",
  projectId: "portfolio-analytics-7c75b",
  storageBucket: "portfolio-analytics-7c75b.firebasestorage.app",
  messagingSenderId: "685039911846",
  appId: "1:685039911846:web:be28d8c482004ee9cf8567",
  measurementId: "G-FQV64L3T1X",
};


// 🚀 Init app
const app = initializeApp(firebaseConfig);

// optional (Google Analytics dashboard)
export const analytics = getAnalytics(app);

// 📊 Firestore DB (MAIN THING)
export const db = getFirestore(app);



export const trackVisit = async (data) => {
  await addDoc(collection(db, "visits"), {
    ...data,
    timestamp: Date.now(),
  });
};

export const listenVisits = (callback) => {
  return onSnapshot(collection(db, "visits"), (snapshot) => {
    const data = snapshot.docs.map((doc) => doc.data());
    callback(data);
  });
};
