import { db } from "@/lib/Firebase";
import { Timestamp, doc, setDoc, updateDoc, deleteDoc} from "firebase/firestore";

export const createNewCategory = async (data) => {
  if (!data?.name) {
    throw new Error("Name is undefined");
  }
  if (!data?.slug) {
    throw new Error("Slug is undefined");
  }

  const categoryRef = doc(db, "categories", data?.slug);

  await setDoc(categoryRef, {
    ...data,
    id: data?.slug,
    timestamp: Timestamp.now(),
    imageUrl: data?.imageUrl || "", // Store image URL if available
  });
};


export const updateCategory = async (data) => {
  if (!data?.name) {
    throw new Error("Name is undefined");
  }
  if (!data?.slug) {
    throw new Error("Slug is undefined");
  }

  const categoryRef = doc(db, "categories", data?.slug);

  // Use `updateDoc` instead of `setDoc` to avoid overwriting
  await updateDoc(categoryRef, {
    ...data,
    timestamp: Timestamp.now(), // Update timestamp on edit
    imageUrl: data?.imageUrl || "", // Keep existing image if not provided
  });
};


export const deleteCategory = async (id) => {
  console.log(id);
  if(!id) {
    throw new Error("id is not defined");
  }
  await deleteDoc(doc(db, "categories", id));
} 