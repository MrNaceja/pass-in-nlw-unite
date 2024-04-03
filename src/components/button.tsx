import { LucideIcon } from "lucide-react"
import { ComponentProps } from "react"

interface IButtonProps extends ComponentProps<'button'> {
    icon: LucideIcon
}   
export const Button = ({ icon: Icon, ...props } : IButtonProps) => {
    return (
        <button {...props} className={`
            size-8 rounded-md bg-zinc-900 border border-white/10 p-2 
            text-zinc-50 grid place-content-center
            ${props.disabled ? 'cursor-not-allowed opacity-50' : ''}
            ${props.className}
        `}>
            <Icon size={15}/>
        </button>
    )
}