import Link from 'next/link'
import React from 'react'
import { Pencil, Trash } from 'lucide-react'
const ButtonAction = () => {
    return (
        <div className='flex gap-2'>
            <Link href='/edit/1' className='btn'><Pencil />edit</Link>
            <button className='btn btn-error'><Trash /> Delete</button>
        </div>
    )
}

export default ButtonAction