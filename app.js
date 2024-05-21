import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getFirestore, getDocs, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";
import { irregulars } from "./data.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMf0BxRCsTvFfZ6fOAeZsLi0PJ4fxlhtw",
  authDomain: "irregular-verbs-b8dc9.firebaseapp.com",
  projectId: "irregular-verbs-b8dc9",
  storageBucket: "irregular-verbs-b8dc9.appspot.com",
  messagingSenderId: "597971243862",
  appId: "1:597971243862:web:c2bd34a95e4e50e6f97cf7",
  measurementId: "G-94DFHYC6MD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const querySnapshot = await getDocs(collection(db, "verbs"));
querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${doc.data().base}`);
});

async function sendData(obj) {

  console.log("enviando");

  try {
    const docRef = await addDoc(collection(db, "verbs"), obj);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

document.getElementById("send").addEventListener("click", function () {

  irregulars.forEach(function(verb){
    let obj = {
      es: verb.es,
      base: verb.base,
      pastSimple: verb.pastSimple,
      pastParticple: verb.pastParticiple,
    }
    sendData(obj);
  });
});