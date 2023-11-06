import BackBtn from '@/app/components/BackBtn'
import Badge from '@/app/components/Badge'
import ButtonAction from '@/app/components/ButtonAction'
import { db } from '@/app/lib/db'
import Image from 'next/image'
import React, { FC } from 'react'


interface BlogDetailPageProps {
    params: { id: string }

}
const getPost = async (id: string) => {
    try {
        const response = await db.post.findUnique({ where: { id }, select: { id: true, title: true, content: true, Tag: true, imageUrl: true } })
        return response;
    } catch (error) {
        console.log(error);

    }
}
const BlogDetailPage: FC<BlogDetailPageProps> = async ({ params }) => {

    const post = await getPost(params.id)
    return (
        <div className='w-full'>
            <BackBtn />
            {post?.imageUrl !== '' ? (
                <div className="w-full relative h-[300px] flex justify-center">
                    <Image src={post?.imageUrl} alt={post?.title} width={800} height={1200} className='rounded-2xl' />
                </div>
            ) : <p className='text-center text-2xl font-bold my-4'>No image</p>}
            <div className='mb-8'>
                <div className='flex items-center gap-4'>
                    <h2 className='text-2xl font-bold my-4'>{post?.title}</h2>
                    <Badge>{post?.Tag.name}</Badge>
                </div>
                <ButtonAction id={params.id} />
            </div>
            {post?.content.split('\n').map((paragraph, index) => (
                <p key={index} className="text-[#d4dce3] text-lg font-semibold leading-relaxed mb-8">{paragraph}</p>
            ))}
        </div>

    )
}

export default BlogDetailPage