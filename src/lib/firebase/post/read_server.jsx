/*import { db } from "@/lib/Firebase";
import { collection, getDocs, doc, getDoc, where, query } from "firebase/firestore";


export const getAllPosts = async () => {
  return await getDocs(collection(db, "posts")).then((snaps) => snaps.docs.map((d) => d.data()));
}

export const getAllPostsWithCategory = async (categoryId) => {
  const q = query(collection(db, "posts"), where("categoryId", "==", categoryId))
  return await getDocs(q).then((snaps) => snaps.docs.map((d) => d.data()));
}

export const getPost = async (id) => {
  if (!id) {
    throw new Error("getPost was called without an ID");
  }

  const docRef = doc(db, "posts", id); // Correct Firestore path
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error(`No post found for ID: ${id}`);
  }

  return docSnap.data();
};*/

import { db } from "@/lib/Firebase";
import { collection, getDocs, doc, getDoc, where, query } from "firebase/firestore";

export const fetchCache = "no-store"; // Prevents Vercel from caching API responses
export const revalidate = 0; // Forces re-fetching on every request

// export const getAllPosts = async () => {
//   return await getDocs(collection(db, "posts"), { source: "server" }).then((snaps) =>
//     snaps.docs.map((d) => ({ id: d.id, ...d.data() }))
//   );
// };
export const getAllPosts = async () => {
  return await getDocs(collection(db, "posts"), { source: "server" }) // Fetch directly from Firestore
    .then((snaps) => snaps.docs.map((d) => ({ id: d.id, ...d.data() })));
};

export const getAllPostsWithCategory = async (categoryId) => {
  const q = query(collection(db, "posts"), where("categoryId", "==", categoryId));
  return await getDocs(q, { source: "server" }).then((snaps) =>
    snaps.docs.map((d) => ({ id: d.id, ...d.data() }))
  );
};

export const getPost = async (id) => {
  if (!id) {
    throw new Error("getPost was called without an ID");
  }

  const docRef = doc(db, "posts", id);
  const docSnap = await getDoc(docRef, { source: "server" });

  if (!docSnap.exists()) {
    throw new Error(`No post found for ID: ${id}`);
  }

  return { id: docSnap.id, ...docSnap.data() };
};