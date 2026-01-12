import { ModalContentProps } from "../../types"

export const ModalContent = (props: ModalContentProps) => {

    const { children } = props
    return (
        <div className="flex flex-wrap gap-y-[15px] px-[30px]">{children}</div>
    )

} 