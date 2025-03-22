import { db } from "@/lib/Firebase";
import { collection, getDocs, doc, getDoc, onSnapshot, where, query } from "firebase/firestore";

export const dynamic = "force-dynamic"; // Force fresh fetch on every request
export const fetchCache = "no-store"; // Disable Vercel's data caching
export const revalidate = 0; // Prevent Next.js from caching

/*export const getAllPosts = async () => {
  return await getDocs(collection(db, "posts"), { source: "server" }).then((snaps) => snaps.docs.map((d) => ({ id: d.id, ...d.data() })));
};*/
export const getAllPosts = async () => {
  const queryRef = collection(db, "posts");
  
  // Fetch all posts, but filter out any posts with an empty ID
  return await getDocs(queryRef, { source: "server" })
    .then((snaps) => 
      snaps.docs
        .filter((doc) => doc.id && doc.id.trim() !== '') // Filter out documents with empty ID
        .map((d) => ({ id: d.id, ...d.data() }))
    );
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