import {Gauge, LayoutList, ChartBarStacked, UserRound} from "lucide-react";
import Link from "next/link";


export default function AdminSidebar() {
  const links = [
    {
      name: "Dashboard",
      link: "/admin",
      icon: <Gauge />
    },
    {
      name: "Post",
      link: "/admin/posts",
      icon: <LayoutList />
    },  
    {
      name: "Categories",
      link: "/admin/categories",
      icon: <ChartBarStacked />
    },  
    {
      name: "Authors",
      link: "/admin/authors",
      icon: <UserRound />
    },  
    ]
  return (
    <section className='w-[130px] border-r h-screen shadow-md bg-white pr-2 pt-5'>
    <ul>
    {
      links.map((item, i) =>(
      <Link href={item.link} key={i+1}>
      <li key={i+1} className='w-full flex items-center gap-2 my-4 py-1 font-semibold bg-zinc-200 rounded-r-full px-1'>
      {item.icon}
      <span>{item.name}</span>
      </li>
      </Link>
      ))
    }
    </ul>
    </section>
    );
}