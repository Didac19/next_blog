import React, { FC } from 'react'
interface BadgeProps {
    children: React.ReactNode
}
const Badge: FC<BadgeProps> = ({ children }: BadgeProps) => {
    return (
        <div className="badge badge-primary text-sm">{children}</div>
    )
}

export default Badge