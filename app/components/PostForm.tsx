'use client';
import React, { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormInputPost } from "../types";
import { useQuery } from "react-query";
import SubmitBtn from "./SubmitBtn";
import Loading from "./Loading";
import axios from "axios";
import { Tag } from "@prisma/client";

interface PostFormProps {
  submit: SubmitHandler<FormInputPost>,
  isEditing: boolean,
  initialValue?: FormInputPost,
  isLoadingSubmit?: boolean
}
const PostForm: FC<PostFormProps> = ({ submit, isEditing, initialValue, isLoadingSubmit }) => {
  const { register, handleSubmit } = useForm<FormInputPost>({
    defaultValues: initialValue
  });
  const { data: tags, isLoading: isLoadingTags } = useQuery<Tag[]>({
    queryKey: ['tags'],
    queryFn: async () => {
      const res = await axios.get('/api/tags');
      return res.data;
    }
  });


  return (
    <form className="flex flex-col items-center gap-5 mt-10 w-full" onSubmit={handleSubmit(submit)}>
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
      <input type="file" className="file-input file-input-bordered w-full max-w-lg"  {...register('imageUrl', { required: false })} />

      {isLoadingTags ?
        <Loading /> :
        <select className="select select-bordered w-full max-w-lg" {...register('tagId', { required: true })} defaultValue={''}>
          <option disabled value=''>
            Select tags
          </option>
          {tags?.map((tag: any) => (
            <option value={tag.id} key={tag.id}>{tag.name}</option>
          ))}
        </select>}


      <SubmitBtn isSubmiting={isLoadingSubmit}>
        {isLoadingSubmit && <Loading />}
        {isEditing ? (isLoadingSubmit ? 'updating...' : 'update')
          : isLoadingSubmit ? 'creating...' : 'create'}
      </SubmitBtn>
    </form>
  );
};

export default PostForm;
