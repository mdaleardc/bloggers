"use client";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "@/lib/contexts/AuthContext";
import Link from "next/link"

export default function SigninBtn() {
  const {
    user,
    isLoading,
    error,
    handleSigninWithGoogle,
    handleLogout,
  } = useAuth();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (user) {
    return (
      <div className='flex gap-2 items-center justify-center'>
        <button 
          className='bg-zinc-800 text-zinc-50 px-1 font-normal rounded-full flex items-center gap-1'
          onClick={async () => {
            await handleLogout();
          }}
        >
          SignOut
        </button>
        <Link href="/admin">
        <div className='flex gap-2 items-center justify-center border border-zinc-200 rounded-full bg-blue-50'>
        <p className='font-semibold hidden py-1 px-2 xl:block'>{user?.displayName?.split(" ").map(word => word[0]).join("")}</p>
        <div className='w-[30px] h-[30px] border border-zinc-300 inset-shadow-md rounded-full bg-zinc-50 overflow-hidden'>
        <img src={user?.photoURL} alt="profile" className='object-cover h-full w-full'/>
        </div>
        <p className='hidden xl:block'>{user?.email}</p>
        </div>
        </Link>
      </div>
    );
  }

  return (
    <button
      onClick={async () => {
        await handleSigninWithGoogle();
        console.log("btn clicked");
      }}
      className='bg-zinc-800 text-zinc-50 px-1 py-[0.11rem] font-semibold rounded-2xl flex items-center gap-1'
    >
      <FcGoogle size='20'/>
      SignIn
    </button>
  );
}