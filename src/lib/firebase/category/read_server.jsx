import { db } from "@/lib/Firebase";
import {collection, getDocs, doc, getDoc } from "firebase/firestore";



export const getCategory = async (id) => {
  if (!id) {
    throw new Error("getCategory was called without an ID");
  }

  const docRef = doc(db, "categories", id); // Correct Firestore path
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error(`No category found for ID: ${id}`);
  }

  return docSnap.data();
};


export const getAllCategory = async () => {
  return await getDocs(collection(db, "categories")).then((snaps) => snaps.docs.map((d) => d.data()));
};