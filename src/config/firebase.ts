import { initializeApp } from 'firebase/app';
// Import the functions you need from the SDKs you need

import { getAuth } from 'firebase/auth'

// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


//config for buyer account
const BuyerConfig = {
    apiKey: "AIzaSyDOBRB0ZIFjw8RoKpvyZOsUdHuk3f4TUMQ",
    authDomain: "benext-18c39.firebaseapp.com",

    projectId: "benext-18c39",

    storageBucket: "benext-18c39.appspot.com",

    messagingSenderId: "853574768395",

    appId: "1:853574768395:web:8aae1f0a65b4aca7efb40e",

    measurementId: "G-M9PFDNC36Q"

};


//configs for seller account
const sellerConfig = {
    apiKey: "AIzaSyCC11ljdAznHoO3737Vz58KAmcxQH2f_U0",
    authDomain: "benext-selleracc.firebaseapp.com",
    projectId: "benext-selleracc",
    storageBucket: "benext-selleracc.appspot.com",
    messagingSenderId: "50433114953",
    appId: "1:50433114953:web:6777fd45575bca3a0f1098",
    measurementId: "G-JTMV67JXZJ"
}

// Initialize Firebase

const buyerApp = initializeApp(BuyerConfig);
const sellerApp =initializeApp(sellerConfig,'seller');
export const sellerDb = getFirestore(sellerApp);
export const sellerAuth = getAuth(sellerApp)
export const buyerDb = getFirestore(buyerApp);
export const buyerAuth = getAuth(buyerApp);
export const sellerStorage = getStorage(sellerApp); 

