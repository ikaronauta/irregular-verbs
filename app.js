import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import {
  getFirestore,
  getDocs,
  collection,
  query,
  where,
  addDoc,
} from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";
import { getAllDocs } from "./modules/fb/firebase.js";
import { firebaseConfig } from "./data/fbdata.js";

let date;
let dataVerbs = [];

async function inicio() {
  date = new Date().toLocaleDateString().replaceAll("/", "-");
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  initEventListeners();

  if (existLocalStorage(`${date}-data`)) {
    dataVerbs = JSON.parse(localStorage.getItem(`${date}-data`));
  } else {
    console.log("Consultando información...");
    let data = await getAllDocs(db);

    data.forEach((doc) => {
      dataVerbs.push({
        id: doc.id,
        data: doc.data(),
      });
    });
    localStorage.setItem(`${date}-data`, JSON.stringify(dataVerbs));
    console.log("Información cargada con exito !!!");
  }
}

function initEventListeners() {
  document.getElementById("send").addEventListener("click", function () {
    let verb = document.getElementById("verb").value;
  });

  document.getElementById("verb").addEventListener("keyup", function () {
    getVerb(this.value.toLowerCase());
  });
}

function existLocalStorage(item) {
  if (localStorage.getItem(item)) return true;
  else return false;
}

function getVerb(verb) {
  let prueba = dataVerbs.find(function (objVerb) {
    return objVerb.data.es.find(function (item) {
      return item == verb;
    });
    //console.log(objVerb.data.es);
  });

  if (prueba) console.log(prueba.data);

  return;

  dataVerbs.find(function (objVerb) {
    objVerb.es.find(function (item) {
      item == verb;
    });
  });
  debugger;
}

inicio();
