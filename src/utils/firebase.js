
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase } from "firebase/database";
const process={env:"AIzaSyADqvuE0vS55AbgnNu-A7TX51WfMXS1nfw"}
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//"AIzaSyADqvuE0vS55AbgnNu-A7TX51WfMXS1nfw"












export const firebaseConfig = {
  apiKey:process.env,
  authDomain:"aipdf-375e4.firebaseapp.com" ,
  projectId: "aipdf-375e4",
  storageBucket: "aipdf-375e4.appspot.com",
  messagingSenderId: "446862940565",
  appId: "1:446862940565:web:8c8d4b14421fbf2481fe9c",
  measurementId: "G-JKTX7L36JX",
  databaseURL: "https://aipdf-375e4-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);









