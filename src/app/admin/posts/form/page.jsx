"use client";  
import { usePostForm } from "./context/PostFormContext";
import { useCategory } from "@/lib/firebase/category/read";
import { useAuthor } from "@/lib/firebase/author/read";
import { useSearchParams } from "next/navigation";  
import { useEffect } from "react";
import { RTEField } from "./components/RTEField";
  
export default function PostFormPage() {  
  const searchParams = useSearchParams();  
  const updatePostId = searchParams.get("id");  

  const {  
    data, isLoading, error, handleCreate, handleData, isDone, image, setImage, fetchData, handleUpdate, handleDelete  
  } = usePostForm();  

  useEffect(() => {  
    if (updatePostId) {  
      fetchData(updatePostId); // Fetch data if we are updating an existing post  
    }  
  }, [updatePostId]);  

  const handleSubmit = (e) => {  
    e.preventDefault();  
    if (updatePostId) {  
      handleUpdate(); // Update the post if an ID is present  
    } else {  
      handleCreate(); // Otherwise, create a new post  
    }  
  };  

  return (  
    <main className="w-full bg-zinc-50 p-4 ml-[8rem]">  
      <div className="flex flex-row-reverse items-center gap-5 justify-end">  
        <h1 className="font-bold">Post | Form</h1>  
        {updatePostId && (  
          <h2 className="bg-[orange] rounded-full text-zinc-50 font-semibold px-2">Update</h2>  
        )}  
        {!updatePostId && (  
          <h2 className="bg-green-500 rounded-full text-zinc-50 font-semibold px-2">Create</h2>  
        )}  
      </div>  
      <section className="flex flex-col sm:flex-row mt-5 gap-4">  
        <form  
          className="bg-blue-50 p-4 rounded-md shadow-xl"  
          onSubmit={handleSubmit}  
        >  
          <div className="flex flex-col gap-2">  
            <label className="text-sm text-zinc-700 font-bold">Post Title <span className="text-red-500">*</span></label>  
            <input  
              type="text"  
              placeholder="Enter post title"  
              required  
              className="bg-zinc-50 h-8 text-zinc-900 pl-2 outline-none py-2 border inset-shadow-md focus:ring-[0.05rem] ring-green-300 rounded-full"  
              onChange={(e) => handleData("title", e.target.value)}  
              value={data?.title || ""}  
            />  
          </div>  
          <div className="flex flex-col gap-2 mt-2">  
            <label className="text-sm text-zinc-700 font-bold">Post Slug <span className="text-red-500">*</span></label>  
            <input  
              type="text"  
              placeholder="Enter post slug"  
              required  
              disabled={updatePostId}
              className="bg-zinc-50 h-8 text-zinc-900 pl-2 outline-none py-2 border inset-shadow-md focus:ring-[0.05rem] ring-green-300 rounded-full"  
              onChange={(e) => handleData("slug", e.target.value)}  
              value={data?.slug || ""}  
            />  
          </div>
          
          <SelectCategoryField />
          <SelectAugthorField />
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
          <div className="flex flex-col gap-2 mt-2">  
            <label className="text-sm text-zinc-700 font-bold">Image</label>  
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
              {isLoading ? "Loading..." : updatePostId ? "Update" : "Create"}  
            </button>  
          )}  
          
          {updatePostId && !isDone && (  
            <button  
              onClick={(e)=>{
                e.preventDefault();
                handleDelete(updatePostId)
              }}
              className="bg-red-500 rounded-full text-white py-1 text-xl font-semibold mt-5 w-full"  
              disabled={isLoading || isDone}  
            >  
              Delete  
            </button>  
          )}  
          
          {isDone && <p className="text-green-500 font-semibold text-center">{updatePostId ? "Updated" : "Created"} successfully!</p>}  
        </form>  
        <RTEField />
      </section>  
    </main>  
  );  
}


function SelectCategoryField() {
  
    const { data, handleData } = usePostForm();  
    
  const { data: category } = useCategory();
  
  return (
    <div className="flex flex-col gap-2 mt-2">  
            <label className="text-sm text-zinc-700 font-bold">Select Category <span className="text-red-500">*</span></label>  
            
    <select name='category' 
    className='py-1 rounded-full px-2'
    value={data?.categoryId || ""}
    onChange={(e)=> handleData("categoryId", e.target.value)}
    required>
    <option value="">Select Category</option>
    {category && category?.map((item, i)=>(<option key={i+1} value={item.id}>{item.name}</option>))}
    </select>
    </div>
    )
}



function SelectAugthorField() {
  
    const { data, handleData } = usePostForm();  
    
  const { data: author } = useAuthor();
  
  return (
    <div className="flex flex-col gap-2 mt-2">  
            <label className="text-sm text-zinc-700 font-bold">Select Author <span className="text-red-500">*</span></label>  
            
    <select name='author' 
    className='py-1 rounded-full px-2'
    value={data?.authorId || ""}
    onChange={(e)=> handleData("authorId", e.target.value)}
    required>
    <option value="">Select Author</option>
    {author && author?.map((item, i)=>(<option key={i+1} value={item.id}>{item.name}</option>))}
    </select>
    </div>
    )
}