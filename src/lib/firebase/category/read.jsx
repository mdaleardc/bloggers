"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/Firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import Link from "next/link"

export const useCategory = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
      setIsLoading(true);
      const querySnapshot = await getDocs(collection(db, "categories"));
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


export const getCategory = async (id) => {
  if (!id) {
    throw new Error("getCategory was called without an ID");
  }

  const docRef = doc(db, "categories", id); // Correct Firestore path
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error(`No category found for ID: ${id}`);
  }

  return docSnap;
};