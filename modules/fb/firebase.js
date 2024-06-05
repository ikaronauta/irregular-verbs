
import {
  getDocs,
  collection,
} from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";

export async function getAllDocs(db) {
  const docs = await getDocs(collection(db, "irregulars"));

  return docs;

  

  localStorage.setItem(`${date}-data`, JSON.stringify(dataVerbs));
}
