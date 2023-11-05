'use client';
import React, { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormInputPost } from "../types";
import SubmitBtn from "./SubmitBtn";
interface PostFormProps {
  submit: SubmitHandler<FormInputPost>,
  isEditing: boolean
}
const PostForm: FC<PostFormProps> = ({ submit, isEditing }) => {
  const { register, handleSubmit } = useForm<FormInputPost>();

  return (
    <form className="flex flex-col items-center gap-5 mt-10" onSubmit={handleSubmit(submit)}>
      <input
        type="text"
        {...register("title", { required: true })}
        placeholder="title"
        className="input input-bordered w-full max-w-lg "
      />
      <textarea
        className="textarea textarea-bordered max-w-lg w-full"
        placeholder="Content"
        {...register("content", { required: true })}
      ></textarea>
      <select className="select select-bordered w-full max-w-lg" {...register('tag', { required: true })} defaultValue={''}>
        <option disabled value=''>
          Select tags
        </option>
        <option>PHP</option>
        <option>Javascript</option>
        <option>Python</option>
      </select>
      <SubmitBtn>{isEditing ? 'update' : 'create'}</SubmitBtn>
    </form>
  );
};

export default PostForm;
