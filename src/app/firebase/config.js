import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD1fiI4pUOFgaMTkVHYCf5kLdBqFspvowo",
  authDomain: "mini-blog-95c33.firebaseapp.com",
  projectId: "mini-blog-95c33",
  storageBucket: "mini-blog-95c33.firebasestorage.app",
  messagingSenderId: "768656311849",
  appId: "1:768656311849:web:6da6b41639873bb6063e38",
  measurementId: "G-PR21XHV2VF"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);

export { db };