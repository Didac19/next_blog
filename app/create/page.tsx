'use client'
import React from "react";
import PostForm from "../components/PostForm";
import { SubmitHandler } from "react-hook-form";
import { FormInputPost } from "../types";
import BackBtn from "../components/BackBtn";

const CreatePage = () => {
  const handlePostCreation: SubmitHandler<FormInputPost> = (data: any) => {
    console.log(data);

  }
  return (
    <div>
      <BackBtn />
      <h1 className="text-2xl my-4 font-bold text-center">Add new post</h1>
      <PostForm submit={handlePostCreation} isEditing={false} />
    </div>
  );
};

export default CreatePage;
