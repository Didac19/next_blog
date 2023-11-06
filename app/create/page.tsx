'use client'
import React, { useState } from "react";
import PostForm from "../components/PostForm";
import { SubmitHandler } from "react-hook-form";
import { FormInputPost } from "../types";
import BackBtn from "../components/BackBtn";
import { useMutation } from "react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEdgeStore } from "../lib/edgestore";
import Loading from "../components/Loading";


const CreatePage = () => {

  const { edgestore } = useEdgeStore();

  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handlePostCreation: SubmitHandler<FormInputPost> = async (data: any) => {
    const file = data.imageUrl[0];
    if (file) {
      setUploading(true);
      try {
        const res = await edgestore.publicFiles.upload({
          file,
          onProgressChange: (progress) => {
            // you can use this to show a progress bar
            console.log(progress);
            setProgress(progress);
          },
        });
        console.log(res);
        data.imageUrl = res.url || '';
        createPost(data);
      } catch (error) {
        console.error(error);
      } finally {
        setUploading(false);
      }
    }
    else {
      data.imageUrl = '';
      createPost(data);
    }
  }
  const router = useRouter();

  const { mutate: createPost, isLoading, isError } = useMutation({
    mutationFn: async (newPost: FormInputPost) => {
      const response = await axios.post('/api/posts', newPost)
      return response;
    }, onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {
      router.push('/')
      router.refresh()
    }
  })

  return (
    <div className="w-full">
      <BackBtn />
      <h1 className="text-2xl my-4 font-bold text-center">Add new post</h1>
      {uploading && (<div className="text-center flex justify-center items-center gap-1">
        <span>uploading image {progress}%</span><Loading />
      </div>)}
      <PostForm submit={handlePostCreation} isEditing={false} isLoadingSubmit={isLoading} />
    </div>
  );
};

export default CreatePage;
