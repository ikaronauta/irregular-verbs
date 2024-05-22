import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getFirestore, getDocs, collection, query, where, addDoc  } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";
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



document.getElementById("send").addEventListener("click", function () {
  let verb = document.getElementById("verb").value;
  //getAllDocs();
  getDocForEs(verb);
  //sendData();
});

async function getAllDocs() {
  const querySnapshot = await getDocs(collection(db, "irregulars"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data().base}`);
  });
}

async function getDocForEs(verb){

  if(verb == '') {
    alert("Debe ingresar un verbo");
    return;
  }

  console.log(`Consultando ${verb}...`);

  const irregularsCollection = collection(db, "irregulars");
  const q = query(irregularsCollection, where("es", "array-contains", verb.toLowerCase()));

  const querySnapshot = await getDocs(q);

  if(querySnapshot.size > 0){
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
    });
  } else{
    console.log(`No se encontro ${verb}`);
  }
}

let count = 0;

async function sendData() {

    console.log("enviando");

    try {
        const docRef = await addDoc(collection(db, "irregulars"), irregulars[count]);
        console.log("Document written with ID: ", docRef.id);
        count++;

        if (count <= irregulars.length) sendData();
        else console.log("Guardado Finalizado");
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}
