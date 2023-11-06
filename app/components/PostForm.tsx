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
  const { register, handleSubmit, setValue, watch } = useForm<FormInputPost>({
    defaultValues: initialValue
  });
  const { data: tags, isLoading: isLoadingTags } = useQuery<Tag[]>({
    queryKey: ['tags'],
    queryFn: async () => {
      const res = await axios.get('/api/tags');
      console.log('tags', res.data);

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
        <Loading /> : (

          <div className="flex">
            {
              tags?.map((tag: any) => (
                <label className="label flex items-center gap-2" key={tag.id}>
                  <span>{tag.name}</span>
                  <input
                    type="checkbox"
                    value={tag.id}
                    defaultChecked={initialValue?.tags.some((postTag: any) => postTag.id === tag.id)}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      const currentTags = Array.isArray(watch('tags')) ? watch('tags') : [];
                      setValue('tags',
                        checked
                          ? [...currentTags, tag.id]
                          : currentTags.filter((tagId: string) => tagId !== tag.id)
                      );
                    }}
                  />
                </label>
              ))
            }
          </div>
        )

      }


      <SubmitBtn isSubmiting={isLoadingSubmit}>
        {isLoadingSubmit && <Loading />}
        {isEditing ? (isLoadingSubmit ? 'updating...' : 'update')
          : isLoadingSubmit ? 'creating...' : 'create'}
      </SubmitBtn>
    </form>
  );
};

export default PostForm;
