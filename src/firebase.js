import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAIzcPZxBX2lwG0pTYbN5wiD8Z1G6vjn5M",
  authDomain: "wargame-bb618.firebaseapp.com",
  projectId: "wargame-bb618",
  storageBucket: "wargame-bb618.firebasestorage.app",
  messagingSenderId: "220288623186",
  appId: "1:220288623186:web:d0153d9696ad8a1012f58b",
  measurementId: "G-1WKH7GBJBL"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);