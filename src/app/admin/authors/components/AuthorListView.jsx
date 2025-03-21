"use client"
import {useAuthor} from "@/lib/firebase/author/read";
import Link from "next/link";

export default function AuthorListView() {
  const {data, isLoading,  isError} = useAuthor();
  if(isLoading) {
    return <p>Loading...</p>
  }
  if(isError) {
    return <p>Something went wrong to view author list</p>
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
        <th className="border py-2">Name</th>
        <th className="border py-2">Email</th>
        <th className="border py-2">Date</th>
        <th className="border py-2">Action</th>
      </tr>
    </thead>
    <tbody>
      {data.map(({ id, name, email, imageUrl, timestamp }, index) => (
        <tr key={id} className="border odd:bg-zinc-100">
          <td className="border px-3">{index + 1}</td>
          <td className="border px-3"><img className="h-10 w-full object-cover" src={imageUrl}/></td>
          <td className="border px-3">{name}</td>
          <td className="border px-3">{email}</td>
          <td className="border px-3">{new Date(timestamp.seconds * 1000).toLocaleDateString()}</td>
          <td className="border px-3">
          <Link href={`authors/form?id=${id}`}>
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