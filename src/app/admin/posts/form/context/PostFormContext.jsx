"use client";
import { createContext, useContext, useState } from "react";
import { createNewPost, updatePost, deletePost } from "@/lib/firebase/post/write";
import { getPost } from "@/lib/firebase/post/read";
import { useRouter, searchParams } from "next/navigation";

const PostFormContext = createContext();

export default function PostFormContextProvider({ children }) {
  
  const router = useRouter();
  
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDone, setIsDone] = useState(false);
  const [image, setImage] = useState(null);

  const handleData = (key, value) => {
    setIsDone(false);
    setData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

// create data
  const handleCreate = async () => {
    setError(null);
    setIsLoading(true);
    setIsDone(false);

    try {
      let imageUrl = "";

      // Upload image to Cloudinary if an image is selected
      if (image) {
        // Get a signed signature from Next.js API
        const signatureResponse = await fetch("/api/cloudinary-signature");
        const { timestamp, signature } = await signatureResponse.json();

        const formData = new FormData();
        formData.append("file", image);
        formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY); // Replace with your Cloudinary API key
        formData.append("timestamp", timestamp);
        formData.append("signature", signature);

        const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
          method: "POST",
          body: formData,
        });

        const result = await response.json();
        if (!result.secure_url) {
          throw new Error("Image upload failed");
        }
        imageUrl = result.secure_url; // Get Cloudinary image URL
      }

      // Create post with image URL
      await createNewPost({ ...data, imageUrl });

      setIsDone(true);
    } catch (err) {
      setError(err?.message);
    }

    setIsLoading(false);
  };
// update data
  const handleUpdate = async () => {
  setError(null);
  setIsLoading(true);
  setIsDone(false);

  try {
    let imageUrl = data.imageUrl; // Use existing image URL by default

    // Upload image to Cloudinary if a new image is selected
    if (image) {
      // Get a signed signature from Next.js API
      const signatureResponse = await fetch("/api/cloudinary-signature");
      const { timestamp, signature } = await signatureResponse.json();

      const formData = new FormData();
      formData.append("file", image);
      formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY); // Replace with your Cloudinary API key
      formData.append("timestamp", timestamp);
      formData.append("signature", signature);

      const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (!result.secure_url) {
        throw new Error("Image upload failed");
      }
      imageUrl = result.secure_url; // Get Cloudinary image URL
    }

    // Update post with new data and image URL
    await updatePost({ ...data, imageUrl });

    setIsDone(true);
  } catch (err) {
    setError(err?.message);
  }

  setIsLoading(false);
};

// delete data

   const handleDelete = async (id) => {
  setIsLoading(true);
  setIsDone(false);
  setError(null);
  
  try {
    // Delete from Firestore
    await deletePost(id)
    setIsDone(true);
    router.push("/admin/posts");
  } catch (err) {
    setError(err?.message || "Failed to delete post");
  }
  
  setIsLoading(false);
};

  // read data
  const fetchData = async (id) => {
    setError(null);
    setIsLoading(true);
    setIsDone(false);
    try {
      const response = await getPost(id);
      if(response.exists()) {
        setData(response.data());
      } else {
      throw new Error(`No post found from ${id}`);
      }
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }

  return (
    <PostFormContext.Provider
      value={{ data, isLoading, error, handleCreate, handleData, isDone, image, setImage, fetchData, handleUpdate, handleDelete }}
    >
      {children}
    </PostFormContext.Provider>
  );
}

export const usePostForm = () => useContext(PostFormContext);
