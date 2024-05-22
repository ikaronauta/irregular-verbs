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

