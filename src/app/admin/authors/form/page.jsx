"use client";  
import { useAuthorForm } from "./context/AuthorFormContext";  
import { useSearchParams } from "next/navigation";  
import { useEffect } from "react";  
  
export default function AuthorFormPage() {  
  const searchParams = useSearchParams();  
  const updateAuthorId = searchParams.get("id");  

  const {  
    data, isLoading, error, handleCreate, handleData, isDone, image, setImage, fetchData, handleUpdate, handleDelete  
  } = useAuthorForm();  

  useEffect(() => {  
    if (updateAuthorId) {  
      fetchData(updateAuthorId); // Fetch data if we are updating an existing author  
    }  
  }, [updateAuthorId]);  

  const handleSubmit = (e) => {  
    e.preventDefault();  
    if (updateAuthorId) {  
      handleUpdate(); // Update the author if an ID is present  
    } else {  
      handleCreate(); // Otherwise, create a new author  
    }  
  };  

  return (  
    <main className="w-full max-w-lg bg-zinc-50 p-4 ml-[8rem]">  
      <div className="flex flex-row-reverse items-center gap-5 justify-end">  
        <h1 className="font-bold">Author | Form</h1>  
        {updateAuthorId && (  
          <h2 className="bg-[orange] rounded-full text-zinc-50 font-semibold px-2">Update</h2>  
        )}  
        {!updateAuthorId && (  
          <h2 className="bg-green-500 rounded-full text-zinc-50 font-semibold px-2">Create</h2>  
        )}  
      </div>  
      <section className="flex mt-5">  
        <form  
          className="w-full bg-blue-50 p-4 rounded-md shadow-xl"  
          onSubmit={handleSubmit}  
        >  
          <div className="flex flex-col gap-2">  
            <label className="text-sm text-zinc-700">Author Name <span className="text-red-500">*</span></label>  
            <input  
              type="text"  
              placeholder="Enter author name"  
              required  
              className="bg-zinc-50 h-8 text-zinc-900 pl-2 outline-none py-2 border inset-shadow-md focus:ring-[0.05rem] ring-green-300 rounded-full"  
              onChange={(e) => handleData("name", e.target.value)}  
              value={data?.name || ""}  
            />  
          </div>  
          <div className="flex flex-col gap-2">  
            <label className="text-sm text-zinc-700">Author Email <span className="text-red-500">*</span></label>  
            <input  
              type="email"  
              placeholder="Enter author email"  
              required  
              disabled={updateAuthorId}
              className="bg-zinc-50 h-8 text-zinc-900 pl-2 outline-none py-2 border inset-shadow-md focus:ring-[0.05rem] ring-green-300 rounded-full"  
              onChange={(e) => handleData("email", e.target.value)}  
              value={data?.email || ""}  
            />  
          </div>  
          {data?.imageUrl && (  
            <div className="w-40 my-2">  
              <img src={data?.imageUrl} alt="selected image" className="h-20" />  
            </div>  
          )}  
          {image && (  
            <div className="w-40 my-2">  
              <img src={URL.createObjectURL(image)} alt="selected image" />  
            </div>  
          )}  
          <div className="flex flex-col gap-2">  
            <label className="text-sm text-zinc-700">Image</label>  
            <input  
              type="file"  
              onChange={(e) => {  
                e.preventDefault();  
                setImage(e.target.files[0]);  
              }}  
            />  
          </div>  
          {error && <p className="text-red-500">{error}</p>}  
          {!isDone && (  
            <button  
              type="submit"  
              className="bg-blue-500 rounded-full text-white py-1 text-xl font-semibold mt-5 w-full"  
              disabled={isLoading || isDone}  
            >  
              {isLoading ? "Loading..." : updateAuthorId ? "Update" : "Create"}  
            </button>  
          )}  
          
          {updateAuthorId && !isDone && (  
            <button  
              onClick={(e)=>{
                e.preventDefault();
                handleDelete(updateAuthorId)
              }}
              className="bg-red-500 rounded-full text-white py-1 text-xl font-semibold mt-5 w-full"  
              disabled={isLoading || isDone}  
            >  
              Delete  
            </button>  
          )}  
          
          {isDone && <p className="text-green-500 font-semibold text-center">{updateAuthorId ? "Updated" : "Created"} successfully!</p>}  
        </form>  
      </section>  
    </main>  
  );  
}