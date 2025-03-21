import { getAllCategory } from "@/lib/firebase/category/read_server";
import Link from "next/link";

export default async function CategoriesPage() {
  const cagetories = await getAllCategory();
  return <main className='mt-[3rem] py-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 items-center justify-center gap-6 mx-auto w-5/6'>
    {
      cagetories?.map((category, key) => {
        return <CategoryCard category={category}  key={key+1}/>
      })
    }
    </main>
    
}

function CategoryCard({ category }) {
  return <Link href={`/categories/${category?.id}`} className='flex flex-col items-center gap-2 bg-blue-50 shadow-sm hover:bg-blue-200 rounded-xl w-full px-4 py-2 hover:shadow-xl'>
        <img src={category?.imageUrl} className='w-16 h-16 rounded-full object-cover'/>
        <p>{category?.name}</p>
        </Link>
}