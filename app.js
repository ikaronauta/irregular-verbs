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
import { existLocalStorage, getVerb } from "./modules/core/main.js";

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

  main();
}

function initEventListeners() {
  $("#verb").on("keyup", function () {
    let data = getVerb(dataVerbs, this.value.toLowerCase());
    console.log(data);

    if (!data) return;

    $("#data").empty();
    $("#data").append($("<p>").html(`Verb: <b>${data.data.base}</b>`));
    $("#data").append(
      $("<p>").html(`Simple Past: <b>${data.data.pastSimple}</b>`)
    );
    $("#data").append(
      $("<p>").html(`Participle Past: <b>${data.data.pastParticiple}</b>`)
    );
  });
}

function main() {
  $("body").append(createDatalist(dataVerbs));
}

function createDatalist(dataVerbs) {
  let datalist = $("<datalist>", {
    id: "dataList-verbs",
    class: "dataList-verbs",
  });

  $(dataVerbs).each(function (idx, obj) {
    $(obj.data.es).each(function (idx, item) {
      datalist.append($("<option>").val(item));
    });
  });

  return datalist;
}

inicio();
