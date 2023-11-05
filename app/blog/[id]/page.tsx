import BackBtn from '@/app/components/BackBtn'
import ButtonAction from '@/app/components/ButtonAction'
import React from 'react'

const BlogDetailPage = () => {
    return (
        <div className=''>
            <BackBtn />
            <div className='mb-8'>
                <h2 className='text-2xl font-bold my-4'>POST 1</h2>
                <ButtonAction />
            </div>
            <p className='text-slate-700'>post content</p>
        </div>

    )
}

export default BlogDetailPage