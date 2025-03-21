"use client"
import {usePost} from "@/lib/firebase/post/read";
import Link from "next/link";

export default function PostListView() {
  const {data, isLoading,  isError} = usePost();
  if(isLoading) {
    return <p>Loading...</p>
  }
  if(isError) {
    return <p>Something went wrong to view post list</p>
  }
  if(!data) {
    return <p>Data not found</p>
  }
    return (
    <div className='mt-4'>
  <table className="w-full">
    <thead className='bg-blue-50 py-2'>
      <tr>
        <th className="border py-2">No</th>
        <th className="border py-2">Image</th>
        <th className="border py-2">Title</th>
        <th className="border py-2">Slug</th>
        <th className="border py-2">Date</th>
        <th className="border py-2">Action</th>
      </tr>
    </thead>
    <tbody>
      {data.map(({ id, title, slug, imageUrl, timestamp }, index) => (
        <tr key={id} className="border odd:bg-zinc-100">
          <td className="border px-3">{index + 1}</td>
          <td className="border px-3"><img className="h-10 w-full object-cover" src={imageUrl}/></td>
          <td className="border px-3">{title}</td>
          <td className="border px-3">{slug}</td>
          <td className="border whitespace-nowrap px-3">{timestamp?.toDate()?.toLocaleDateString()}</td>
          <td className="border px-3">
          <Link href={`posts/form?id=${id}`}>
            <button className="px-3 py-1 rounded-full text-sm font-semibold text-white bg-blue-500">Action</button>
          </Link>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  );
}