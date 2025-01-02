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
    //loadDataList(dataVerbs);
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
      //loadDataList(dataVerbs);
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

    $('.tabSection').removeClass('active');

    $(".container-section").each(function (idx, element) {
      if (value == $(element).attr("id")) {
        $(element).show();
        $(`[data-tab="${value}"]`).addClass('active');

        if(value == 'home')
          $(`[data-tab="home"]`).find('img').attr('src', './assets/icons/home_1.png');
        else 
          $(`[data-tab="home"]`).find('img').attr('src', './assets/icons/home_2.png')
      } else {
        $(element).hide();
      }
    });
  });

  $("#verb").on("keyup", function (e) {
    $("#data").empty();

    if (this.value.length < 2) {
      $("#suggestions").empty();
      return;
    }

    let data = getVerbs(dataVerbs, this.value.toLowerCase());

    loadSuggestions(data);

    //let data = getVerb(dataVerbs, this.value.toLowerCase());

    if (
      data.find((x) => {
        return x.found == $("#verb").val();
      })
    ) {
      showResult(e, data);
    }
  });
}

function loadSuggestions(data) {
  $("#suggestions").empty();

  $(data).each(function (idx, obj) {
    $(obj.data.es).each(function (idx, item) {
      $("#suggestions").append(
        $("<div>", {
          class: "item-suggestions no-select",
          text: item,
        }).on("click", function () {
          $("#verb").val($(this).text());
          $("#verb").trigger("keyup");
          $("#suggestions").empty();
        })
      );
    });
  });
}

function showResult(event, data) {
  if (event.key == "Backspace" || event.key == "Delete") return;

  $("#data").append($("<p>").html(`Verb: <b>${data[0].data.base}</b>`));
  $("#data").append(
    $("<p>").html(`Simple Past: <b>${data[0].data.pastSimple}</b>`)
  );
  $("#data").append(
    $("<p>").html(`Participle Past: <b>${data[0].data.pastParticiple}</b>`)
  );
  // if (event.key != "Backspace" && event.key != "Delete")
  //   $("#verb").val(data[0].found);
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
