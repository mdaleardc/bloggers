import { getAllPostsWithCategory } from "@/lib/firebase/post/read_server";
import { PostCard, CategoryCard } from "@/components/PostListView";



export default async function PostsByCategoryPage({ params }) {
  const { categoryId } = await params;
  const postWithCategory = await getAllPostsWithCategory(categoryId);
  return <main className='w-full mt-[3rem] p-6'>
    <div className='flex items-center gap-2'>
    <h1 className='font-bold'>Category /</h1>
    <div className='border rounded-full bg-zinc-50 bg-opacity-50'>
    <CategoryCard categoryId={categoryId}/>
    </div>
    </div>
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 m-5'>
  {
  postWithCategory?.map((post, key) => {
    return <div key={key+1}>
    <PostCard post={post}/>
    </div>
  })
    
  }
  </div>
  </main>
}

