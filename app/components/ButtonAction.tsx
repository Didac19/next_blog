'use client'
import Link from 'next/link'
import React, { FC } from 'react'
import { Pencil, Trash } from 'lucide-react'
import { useMutation } from 'react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Loading from './Loading'
import { useEdgeStore } from '../lib/edgestore'
interface ButtonActionProps {
    id: string
}

const ButtonAction: FC<ButtonActionProps> = ({ id }) => {
    const router = useRouter();
    const { edgestore } = useEdgeStore();
    // const handleImageDeletion = async (url: string) => {
    //     console.log('url', url);
    //     try {
    //         return await edgestore.publicFiles.delete(
    //             { url: url },
    //         );
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    const { mutate: deletePost, isLoading, isError } = useMutation(
        {
            mutationFn: async () => {
                const post = await axios.get('/api/posts/' + id);
                if (post.data.imageUrl !== '') {
                    // const res = await handleImageDeletion(post.data.imageUrl);
                    // if (res !== undefined) {
                    return axios.delete(`/api/posts/${id}`);
                    // }
                }
                else {
                    return axios.delete(`/api/posts/${id}`);
                }
            }
            , onError: (error) => {
                console.log(error);
            },
            onSuccess: () => {
                router.push('/')
                router.refresh()
            }
        }
    )
    return (
        <div className='flex gap-2 w-full'>
            <Link href={`/edit/${id}`} className='btn'><Pencil />edit</Link>
            <button className='btn btn-error' onClick={() => deletePost()} disabled={isLoading}>
                {isLoading && <Loading />}
                {isLoading ? 'loading' :
                    <><Trash />Delete</>}
            </button>
        </div>
    )
}

export default ButtonAction