// src/utils/firebaseConfig.js

import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyD32ePJYpLTPK-wYS1_cKMTv28h_Wjk5TM",
    authDomain: "montessori-728c0.firebaseapp.com",
    projectId: "montessori-728c0",
    storageBucket: "montessori-728c0.appspot.com",
    messagingSenderId: "583557147412",
    appId: "1:583557147412:web:f7477f93f1988f8185b001",
    measurementId: "G-E80WFVF6DJ"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Inicializar servicios
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
