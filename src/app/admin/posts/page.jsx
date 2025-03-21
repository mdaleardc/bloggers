"use client"
import { CirclePlus } from "lucide-react";
import Link from "next/link";
import PostListView from "./components/PostListView";



export default function PostPage() {
  
  return (
    <main className='w-full p-4 ml-[8rem]'>
    <div className='w-full flex items-center justify-between'>
    <h1 className='text-2xl font-semibold'>Posts Page</h1>
    <Link href='/admin/posts/form'>
    <button className='bg-blue-500 text-white font-semibold py-1 px-2 rounded-full flex gap-2 items-center'>
    <CirclePlus />
    Add
    </button>
    </Link>
    </div>
    <div className='h-screen overflow-y-scroll'>
    <PostListView/>
    </div>
    </main>
    )
}