// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyUDpE9WnfrZ6HccQKs7RULUw5xN9IQYk",
  authDomain: "room-and-food-finder.firebaseapp.com",
  projectId: "room-and-food-finder",
  storageBucket: "room-and-food-finder.appspot.com",
  messagingSenderId: "953513562031",
  appId: "1:953513562031:web:ef03ce28e5c534f29ce95a",
  measurementId: "G-H9BRSJB8XD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
