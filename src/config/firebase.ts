import { initializeApp } from 'firebase/app';
// Import the functions you need from the SDKs you need

import { getAuth } from 'firebase/auth'

// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


//config for buyer account
const BuyerConfig = {
    apiKey:import.meta.env.VITE_BUYERAPIKEY,
    authDomain: import.meta.env.VITE_BUYERAUTHDOMAIN,

    projectId: import.meta.env.VITE_BUYERPROJECTID,

    storageBucket: import.meta.env.VITE_BUYERSTORAGEBUCKET,

    messagingSenderId: import.meta.env.VITE_BUYERMESSAGINGSENDERID,

    appId: import.meta.env.VITE_BUYERAPPID,

    measurementId: import.meta.env.VITE_BUYERMEASUREMENTID

};


//configs for seller account
const sellerConfig = {
    apiKey: import.meta.env.VITE_APIKEY,
    authDomain: import.meta.env.VITE_AUTHDOMAIN,
    projectId: import.meta.env.VITE_PROJECTID,
    storageBucket: import.meta.env.VITE_STORAGEBUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
    appId: import.meta.env.VITE_APPID,
    measurementId: import.meta.env.VITE_MEASUREMENTID,
}

// Initialize Firebase

const buyerApp = initializeApp(BuyerConfig);
const sellerApp =initializeApp(sellerConfig,'seller');
export const sellerDb = getFirestore(sellerApp);
export const sellerAuth = getAuth(sellerApp)
export const buyerDb = getFirestore(buyerApp);
export const buyerAuth = getAuth(buyerApp);
export const sellerStorage = getStorage(sellerApp); 

