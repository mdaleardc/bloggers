import { getCategory } from "@/lib/firebase/category/read_server";
import { getAuthor } from "@/lib/firebase/author/read_server";
import { getAllPosts } from "@/lib/firebase/post/read_server";
import Link from "next/link"

export const dynamic = "force-dynamic"; // Forces fresh fetch from Firestore
export const revalidate = 0; // Ensures no ISR (Incremental Static Regeneration)
export const headers = {
  "Cache-Control": "no-store, max-age=0", // Prevents caching
};
export default async function PostListView() {
  const posts = await getAllPosts();
  if(!posts) {
    return (
    <div>
    <h3>Posts Not Available</h3>
    </div>
    )
  }
  return (
    <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 m-5'>
    {
      posts?.map((post, key)=>{
        return <div key={key} className='bg-zinc-100 rounded-[3px] p-2 shadow-md'>
        <PostCard post={post}/>
        </div>
      })
    }
    </section>
    )
}

export function PostCard({post}) {
  return <Link href={`/post/${post?.id}`}>
      <div className='relative w-full'>
        <img src={post?.imageUrl} className='w-full h-40 mx-auto object-cover rounded-[2px]'/>
        <div className='absolute top-1 right-0'>
        <CategoryCard categoryId={post?.categoryId}/>
        </div>
      </div>
        <h1 className='text-xl font-semibold mt-2 text-zinc-800'>{post?.title}</h1>
        <div className="flex justify-between items-center">
        <AuthorCard authorId={post?.authorId}/>
        <p className='text-xs text-zinc-500'>{post?.timestamp?.toDate()?.toLocaleDateString()}</p>
        </div>
  </Link>
}

async function AuthorCard({authorId}) {
  const author = await getAuthor(authorId);
  return <div>
  <div className='flex gap-2 items-center'>
  <img src={author?.imageUrl} className='w-8 h-8 rounded-full object-cover border'/>
  <h4 className='text-zinc-500 font-medium'>{author?.name}</h4>
  </div>
  </div>
}


 export async function CategoryCard({categoryId}) {
  const category = await getCategory(categoryId);
  return <div>
  <div className='flex gap-1 items-center bg-zinc-50 bg-opacity-50 p-1 rounded-full box-shadow-md'>
  <img src={category?.imageUrl} className='w-5 h-5 rounded-full object-cover border'/>
  <h4 className='text-xs text-zinc-700 text-sm'>{category?.name}</h4>
  </div>
  </div>
}
