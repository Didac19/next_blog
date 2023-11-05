import React, { ReactNode } from 'react'

type SubmitBtnProps = {
    children: ReactNode
}

const SubmitBtn = ({ children }: SubmitBtnProps) => {
    return (
        <button type="submit" className="btn max-w-lg w-full bg-purple-600">
            {children}
        </button>
    )
}




export default SubmitBtn