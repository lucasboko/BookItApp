import { ModalHeaderProps } from "../../types"

export const ModalHeader = (props: ModalHeaderProps) => {

    const { children } = props
    
    return (
        <div className="font-bold text-center text-emerald-700 py-[35px]">{children}</div>
    )

} 