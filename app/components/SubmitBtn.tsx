import React, { ReactNode } from 'react'

type SubmitBtnProps = {
    children: ReactNode,
    isSubmiting?: boolean
}

const SubmitBtn = ({ children, isSubmiting }: SubmitBtnProps) => {
    return (
        <button type="submit" className="btn max-w-lg w-full bg-purple-600" disabled={isSubmiting}>
            {children}
        </button>
    )
}




export default SubmitBtn