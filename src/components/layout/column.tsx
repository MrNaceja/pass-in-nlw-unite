import { HTMLAttributes } from "react"

interface IColumnProps extends HTMLAttributes<HTMLDivElement> {}
export const Column = ({ children, className } : IColumnProps) => {
    return <div className={`flex flex-col ${className || ''}`}>{ children }</div>
}