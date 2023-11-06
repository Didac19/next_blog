import React, { FC } from 'react'
interface BadgeProps {
    children: React.ReactNode
    , bg?: string
}
const Badge: FC<BadgeProps> = ({ children, bg }: BadgeProps) => {
    return (
        <div className={`badge text-sm ${bg} text-[#fcfeff]`}>{children}</div>
    )
}

export default Badge