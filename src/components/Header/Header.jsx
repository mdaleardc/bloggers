"use client"
import { MdOutlineHome } from "react-icons/md";
import { LayoutList, ChartBarStacked } from "lucide-react";
import { RiContactsLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { GiHamburgerMenu } from "react-icons/gi";
import SigninBtn from "./SigninBtn";
import AuthContextProvider from "@/lib/contexts/AuthContext";
import Link from "next/link";
import { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div>
    <nav className='border-b shadow-lg py-2 px-5 flex items-center justify-between fixed top-0 left-0 w-full z-50 bg-zinc-200 text-xl'>
    <Link href='/'>
    <h1 className="font-mono font-bold text-[orange] w-fit px-1 rounded-full tracking-tight bg-black flex items-center">NGenCode</h1>
    </Link>
    <ul className='hidden sm:flex gap-6 font-semibold'>
    <Link href='/'>
    <li className='cursor-pointer hover:text-red-500 flex items-center gap-1'><MdOutlineHome size='20'/> Home</li>
    </Link>
    <Link href='/categories'>
    <li className='cursor-pointer hover:text-red-500 flex items-center gap-1'><ChartBarStacked size='18'/>Categories</li>
    </Link>
    <Link href='/contact-us'>
    <li className='cursor-pointer hover:text-red-500 flex items-center gap-1'><RiContactsLine size='20'/>Contact Us</li>
    </Link>
    </ul>
    <div className='flex flex-row gap-4 items-center justify-between'>
    <AuthContextProvider>
    <SigninBtn />
    </AuthContextProvider>
      <span onClick={()=>setIsOpen(!isOpen)} className='sm:hidden'>{
    isOpen ? <RxCross2 size="25"/> : <GiHamburgerMenu size="25" />
    }</span>
    </div>
    </nav>
    
    
    {/*for mobile devices*/}
    {
    isOpen && <nav className='h-screen text-white border-b shadow-lg py-2 px-4 bg-zinc-500 sm:hidden fixed top-0 z-20'>
    <ul className='w-full flex flex-col gap-6 font-semibold pt-[4rem]'>
    <Link href='/'>
    <li onClick={()=>setIsOpen(!isOpen)} className='cursor-pointer hover:text-red-500 flex items-center gap-1'><MdOutlineHome size='20'/> Home</li>
    </Link>
    <Link href='/categories'>
    <li onClick={()=>setIsOpen(!isOpen)} className='cursor-pointer hover:text-red-500 flex items-center gap-1'><ChartBarStacked size='18'/>Categories</li>
    </Link>
    <Link href='/contact-us'>
    <li onClick={()=>setIsOpen(!isOpen)} className='cursor-pointer hover:text-red-500 flex items-center gap-1'><RiContactsLine size='20'/>Contact Us</li>
    </Link>
    </ul>
    </nav>
    }
    </div>
    )
}

export default  Header;