"use client"

import useSWR from "swr";
import { getCountFromServer, collection } from "firebase/firestore";
import { db } from "../Firebase"

const fetcher = path => getCountFromServer(collection(db, path)).then((value) => value.data().count);

export default function useCollectionCount({path}) {
  const { data, error, isLoading } = useSWR(path, fetcher);
  return { data, error, isLoading }
} 