import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBtjq7Ru7VINp0Ju7j1ijbrNlC2BfUocgw",
    authDomain: "tmdb-5e901.firebaseapp.com",
    projectId: "tmdb-5e901",
    storageBucket: "tmdb-5e901.appspot.com",
    messagingSenderId: "349439930503",
    appId: "1:349439930503:web:824245a3f3d68fd55e8822",
    measurementId: "G-LDT0WNK2J4"
  };


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);