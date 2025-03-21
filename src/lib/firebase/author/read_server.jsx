import { db } from "@/lib/Firebase";
import { doc, getDoc } from "firebase/firestore";

export const getAuthor = async (id) => {
  if (!id) {
    throw new Error("getAuthor was called without an ID");
  }

  const docRef = doc(db, "authors", id); // Correct Firestore path
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error(`No author found for ID: ${id}`);
  }

  return docSnap.data();
};