// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtzzA7SLfR4UFQ3OHlZ-S0-mW6wfFqSzk",
  authDomain: "burada-7806d.firebaseapp.com",
  projectId: "burada-7806d",
  storageBucket: "burada-7806d.appspot.com",
  messagingSenderId: "224737109352",
  appId: "1:224737109352:web:3dcc075ec76ab10c8e22dd",
  measurementId: "G-YS60TET2PG"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp