"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/Firebase";
import { doc, getDoc } from "firebase/firestore";

export const useAdmin = (uid) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    if (!uid) return;

    const checkAdmin = async () => {
      try {
        setIsLoading(true);
        const adminRef = doc(db, "admins", uid);
        const adminSnap = await getDoc(adminRef);

        setIsAdmin(adminSnap.exists()); // Check if admin document exists
      } catch (err) {
        setIsError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    checkAdmin();
  }, [uid]); // Re-run if `uid` changes

  return {
    isAdmin,
    isLoading,
    isError,
  };
};