'use client'
import React, { FC, useState } from 'react'
import { SubmitHandler } from 'react-hook-form';
import { FormInputPost } from '@/app/types';
import PostForm from '@/app/components/PostForm';
import BackBtn from '@/app/components/BackBtn';
import { useQuery, useMutation } from 'react-query';
import axios from 'axios';
import Loading from '@/app/components/Loading';
import { useRouter } from 'next/navigation';
interface EditPostProps {
    params: { id: string }
}
import { useEdgeStore } from "../../lib/edgestore";

const EditPost: FC<EditPostProps> = ({ params }) => {

    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const { edgestore } = useEdgeStore();
    const [oldFileUrl, setOldFileUrl] = useState('');
    const router = useRouter();
    const handlePostCreation: SubmitHandler<FormInputPost> = async (data: any) => {
        const file = data.imageUrl[0];
        if (file) {
            setUploading(true);
            try {
                const res = await edgestore.publicFiles.upload({
                    file,
                    options: {
                        replaceTargetUrl: oldFileUrl,
                    },
                    onProgressChange: (progress) => {
                        setProgress(progress);
                    }
                });
                data.imageUrl = res.url;
                if (res) {
                    updatePost(data);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setUploading(false);
            }
        }
        updatePost(data)

    }
    const { mutate: updatePost, isLoading: isLoadingSubmit, isError } = useMutation({
        mutationFn: async (newPost: FormInputPost) => {
            const response = await axios.patch(`/api/posts/${params.id}`, newPost)
            return response;
        }, onError: (error) => {
            console.log(error);
        },
        onSuccess: () => {
            router.push('/')
            router.refresh()
        }
    })
    const { data: post, isLoading: loadingPost } = useQuery({
        queryKey: ['post', params.id],
        queryFn: async () => {
            const response = await axios.get(`/api/posts/${params.id}`)
            console.log(response.data);

            setOldFileUrl(response.data.imageUrl)
            return response.data;
        }
    })
    if (loadingPost) {
        return (
            <div className='text-center'>
                <Loading />
            </div>
        )
    }
    return (
        <div className='w-full'>
            <BackBtn />
            <h1 className="text-2xl my-4 font-bold text-center">Edit post</h1>
            {uploading && (<div className="text-center flex justify-center items-center gap-1">
                <span>uploading image {progress}%</span><Loading />
            </div>)}
            <PostForm submit={handlePostCreation} isEditing={true} initialValue={post} isLoadingSubmit={isLoadingSubmit} />
        </div>
    );
}

export default EditPost