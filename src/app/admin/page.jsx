import CountCard from "./components/CountCard";
import { MdOutlinePostAdd } from "react-icons/md";
import { BsPerson } from "react-icons/bs";
import { RiStackLine } from "react-icons/ri";
import Link from "next/link";


export default function AdmiPage() {
  return (
    <div className="h-full ml-[8rem] p-5 grid grid-cols-2 sm:grid-cols-3 gap-2 items-center">
    <Link href="/admin/posts">
    <CountCard name={`Posts`} path={`posts`} icon={<MdOutlinePostAdd size="20"/>}/>
    </Link>
    <Link href="/admin/categories">
    <CountCard name={`Categories`} path={`categories`} icon={<RiStackLine size="20"/>}/>
    </Link>
    <Link href="/admin/authors">
    <CountCard name={`Authors`} path={`authors`} icon={<BsPerson size="20"/>}/>
    </Link>
    </div>
    )
}