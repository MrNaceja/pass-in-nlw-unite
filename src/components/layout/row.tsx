import { HTMLAttributes } from "react"

interface IRowProps extends HTMLAttributes<HTMLDivElement> {}
export const Row = ({ children, className } : IRowProps) => {
    return <div className={`flex flex-row ${className || ''}`}>{ children }</div>
}