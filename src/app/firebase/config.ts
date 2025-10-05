import { initializeApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAuth, Auth } from "firebase/auth";
import { FirebaseApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD1fiI4pUOFgaMTkVHYCf5kLdBqFspvowo",
  authDomain: "mini-blog-95c33.firebaseapp.com",
  projectId: "mini-blog-95c33",
  storageBucket: "mini-blog-95c33.firebasestorage.app",
  messagingSenderId: "768656311849",
  appId: "1:768656311849:web:6da6b41639873bb6063e38",
  measurementId: "G-PR21XHV2VF"
};

const app: FirebaseApp = initializeApp(firebaseConfig);

let analytics: Analytics | undefined;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

const db: Firestore = getFirestore(app);
const auth: Auth = getAuth(app);

export { app, db, analytics, auth };