import { db } from "@/lib/Firebase";
import { Timestamp, doc, setDoc, updateDoc, deleteDoc} from "firebase/firestore";

export const createNewAuthor = async (data) => {
  if (!data?.name) {
    throw new Error("Name is undefined");
  }
  if (!data?.email) {
    throw new Error("Email is undefined");
  }

  const authorRef = doc(db, "authors", data?.email);

  await setDoc(authorRef, {
    ...data,
    id: data?.email,
    timestamp: Timestamp.now(),
    imageUrl: data?.imageUrl || "", // Store image URL if available
  });
};


export const updateAuthor = async (data) => {
  if (!data?.name) {
    throw new Error("Name is undefined");
  }
  if (!data?.email) {
    throw new Error("Email is undefined");
  }

  const authorRef = doc(db, "authors", data?.email);

  // Use `updateDoc` instead of `setDoc` to avoid overwriting
  await updateDoc(authorRef, {
    ...data,
    timestamp: Timestamp.now(), // Update timestamp on edit
    imageUrl: data?.imageUrl || "", // Keep existing image if not provided
  });
};


export const deleteAuthor = async (id) => {
  console.log(id);
  if(!id) {
    throw new Error("id is not defined");
  }
  await deleteDoc(doc(db, "authors", id));
} 