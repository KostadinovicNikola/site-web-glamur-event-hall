/* =========================================================
   firebase.js — Configuration et initialisation Firebase
   ========================================================= */

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';

const firebaseConfig = {
  apiKey: "AIzaSyCEM4GMMy6bUbKTBz8-yS2Nis6YC4NaexE",
  authDomain: "glamur-event-hall.firebaseapp.com",
  projectId: "glamur-event-hall",
  storageBucket: "glamur-event-hall.firebasestorage.app",
  messagingSenderId: "1051874958706",
  appId: "1:1051874958706:web:f7ddeefb05b0dfb569d1eb"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
