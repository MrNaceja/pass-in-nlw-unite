import { LucideIcon } from "lucide-react"

interface IButtonProps {
    icon: LucideIcon
}   
export const Button = ({ icon: Icon } : IButtonProps) => {
    return (
        <button className={`
            size-8 rounded-md bg-zinc-900 border border-white/10 p-2 
            text-zinc-50 grid place-content-center
        `}>
            <Icon size={15}/>
        </button>
    )
}