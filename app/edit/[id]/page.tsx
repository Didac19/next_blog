'use client'
import React from 'react'
import { SubmitHandler } from 'react-hook-form';
import { FormInputPost } from '@/app/types';
import PostForm from '@/app/components/PostForm';
const EditPost = () => {
    const handlePostCreation: SubmitHandler<FormInputPost> = (data: any) => {
        console.log(data);

    }
    return (
        <div>
            <h1 className="text-2xl my-4 font-bold text-center">Edit post</h1>
            <PostForm submit={handlePostCreation} isEditing={true} />
        </div>
    );
}

export default EditPost