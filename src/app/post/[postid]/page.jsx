import { getPost } from "@/lib/firebase/post/read_server";
import { getCategory } from "@/lib/firebase/category/read_server";
import { getAuthor } from "@/lib/firebase/author/read_server";


export async function generateMetadata({ params }) {
  // read route params
const { postid } = params;
  const post = await getPost(postid);
 
  return {
    title: post?.title,
    openGraph: {
      title: post?.title,
      images: [post?.imageUrl],
    },
  }
}
 

export default async function SinglePostPage({params}) {
  const { postid } = params;
  const post = await getPost(postid);
  return <div className='mt-[3rem] py-4 mx-auto w-11/12 sm:w-10/12 flex flex-col gap-2 bg-zinc-50 px-2 rounded-sm shadow-sm'>
  <CategoryCard categoryId={post?.categoryId} />
  <h1 className='font-semibold text-xl text-center'>{post?.title}</h1>
  <img src={post?.imageUrl} className='w-full h-auto object-cover mx-auto text-center rounded-sm'/>
  <div className='flex justify-between items-center'>
  <AuthorCard authorId={post?.authorId}/>
  <p className='text-xs text-zinc-500'>{post?.timestamp?.toDate()?.toLocaleDateString()}</p>
  </div>
  <div dangerouslySetInnerHTML={{__html:post?.content }}/>
  </div>
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


async function CategoryCard({categoryId}) {
  const category = await getCategory(categoryId);
  return <div>
  <div className='flex gap-1 items-center bg-zinc-200 w-fit bg-opacity-50 pr-1 rounded-full box-shadow-md'>
  <img src={category?.imageUrl} className='w-6 h-6 rounded-full object-cover border'/>
  <h4 className='text-xs text-zinc-700 text-sm'>{category?.name}</h4>
  </div>
  </div>
}


