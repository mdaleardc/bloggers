import { db } from "@/lib/Firebase";
import { Timestamp, doc, setDoc, updateDoc, deleteDoc} from "firebase/firestore";

export const createNewPost = async (data) => {
  if (!data?.title) {
    throw new Error("Title is undefined");
  }
  if (!data?.slug) {
    throw new Error("Slug is undefined");
  }

  const postRef = doc(db, "posts", data?.slug);

  await setDoc(postRef, {
    ...data,
    id: data?.slug,
    timestamp: Timestamp.now(),
    imageUrl: data?.imageUrl || "", // Store image URL if available
  });
};


export const updatePost = async (data) => {
  if (!data?.title) {
    throw new Error("Title is undefined");
  }
  if (!data?.slug) {
    throw new Error("Slug is undefined");
  }

  const postRef = doc(db, "posts", data?.slug);

  // Use `updateDoc` instead of `setDoc` to avoid overwriting
  await updateDoc(postRef, {
    ...data,
    timestamp: Timestamp.now(), // Update timestamp on edit
    imageUrl: data?.imageUrl || "", // Keep existing image if not provided
  });
};


export const deletePost = async (id) => {
  if(!id) {
    throw new Error("id is not defined");
  }
  await deleteDoc(doc(db, "posts", id));
} 