"use client"
import useCollectionCount from "@/lib/firebase/counts"


export default function CountCard({name, path, icon}) {
  const { data, isLoading, error } = useCollectionCount({path: path});
  if(isLoading) {
    return <p>Loading ...</p>
  }
  if(error) {
    return <p>{error}</p>
  }
  return <div className='flex items-center gap-2 bg-zinc-300 px-2 py-1 rounded-xl'>
  <span>{icon}</span>
  <div>
  <h1 className='text-lg font-semibold'>{name}</h1>
  <p className='font-semibold text-center'>{data}</p>
  </div>
  </div>
}