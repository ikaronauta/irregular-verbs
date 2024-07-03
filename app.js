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
import { existLocalStorage, getVerb, getVerbs } from "./modules/core/main.js";

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

    try {
      let data = await getAllDocs(db);

      data.forEach((doc) => {
        dataVerbs.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      localStorage.setItem(`${date}-data`, JSON.stringify(dataVerbs));
      console.log("Información cargada con exito !!!");
    } catch (error) {
      console.error(error);
    }
  }

  //main();
}

function initEventListeners() {
  $(".tabSection").on("click", function () {
    let value = $(this).data("tab");

    $(".container-section").each(function (idx, element) {
      if (value == $(element).attr("id")) $(element).show();
      else $(element).hide();
    });
  });

  $("#verb").on("keyup", function (e) {
    if (this.value.length < 3) return;

    let data = getVerbs(dataVerbs, this.value.toLowerCase());
    //let data = getVerb(dataVerbs, this.value.toLowerCase());

    loadDataList(data);

    console.log(data);

    $("#data").empty();

    if (data.length != 1) return;

    $("#data").append($("<p>").html(`Verb: <b>${data[0].data.base}</b>`));
    $("#data").append(
      $("<p>").html(`Simple Past: <b>${data[0].data.pastSimple}</b>`)
    );
    $("#data").append(
      $("<p>").html(`Participle Past: <b>${data[0].data.pastParticiple}</b>`)
    );
    if (e.key != "Backspace" && e.key != "Delete")
      $("#verb").val(data[0].found);
  });
}

function loadDataList(data) {
  if ($("datalist").length > 0) $("datalist").remove();

  $("body").append(createDatalist(data));
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
