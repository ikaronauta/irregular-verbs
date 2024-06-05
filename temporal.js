let count = 0;

async function sendData() {
  console.log("enviando");

  try {
    const docRef = await addDoc(
      collection(db, "irregulars"),
      irregulars[count]
    );
    console.log("Document written with ID: ", docRef.id);
    count++;

    if (count <= irregulars.length) sendData();
    else console.log("Guardado Finalizado");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

async function getDocForEs(verb) {
  if (verb == "") {
    alert("Debe ingresar un verbo");
    return;
  }

  console.log(`Consultando ${verb}...`);

  const irregularsCollection = collection(db, "irregulars");
  const q = query(
    irregularsCollection,
    where("es", "array-contains", verb.toLowerCase())
  );

  const querySnapshot = await getDocs(q);

  if (querySnapshot.size > 0) {
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
    });
  } else {
    console.log(`No se encontro ${verb}`);
  }
}

//let count = 0;

async function sendData() {
  console.log("enviando");

  try {
    const docRef = await addDoc(
      collection(db, "irregulars"),
      irregulars[count]
    );
    console.log("Document written with ID: ", docRef.id);
    count++;

    if (count <= irregulars.length) sendData();
    else console.log("Guardado Finalizado");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
