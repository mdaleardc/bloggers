"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/Firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import Link from "next/link"

export const usePost = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
      setIsLoading(true);
      const querySnapshot = await getDocs(collection(db, "posts"));
      const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setData(items);
      setIsLoading(false)
      } catch (err) {
        setIsError(err.message);
      }
    };

    fetchData();
  }, []);
  
  return {
    data,
    isLoading,
    isError,
  }
};


export const getPost = async (id) => {
  if (!id) {
    throw new Error("getPost was called without an ID");
  }

  const docRef = doc(db, "posts", id); // Correct Firestore path
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error(`No post found for ID: ${id}`);
  }

  return docSnap;
};