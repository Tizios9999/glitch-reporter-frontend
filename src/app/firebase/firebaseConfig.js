// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4feyKdKKiaQTxeL4mtMV_45_20S0_QMM",
  authDomain: "glitchreporter-store.firebaseapp.com",
  projectId: "glitchreporter-store",
  storageBucket: "glitchreporter-store.appspot.com",
  messagingSenderId: "928839240393",
  appId: "1:928839240393:web:7d17fdc083667abb7f9b18",
  measurementId: "G-XTF6WEPNGR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export { firebaseConfig, app };
