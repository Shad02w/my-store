import './index.scss'
import type { ReactNode } from 'react'

interface Props {
    count: number
    children: ReactNode
}
export function Badge({ count, children }: Props) {
    return (
        <div className="c-badge">
            {children}
            {count > 0 && <div className="count">{count}</div>}
        </div>
    )
}
