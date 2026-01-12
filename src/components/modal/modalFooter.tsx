import { ModalFooterProps } from "../../types"

export const ModalFooter = (props: ModalFooterProps) => {

    const { children } = props
    return (
        <div className="flex items-center justify-center gap-[15px] py-[40px] px-[30px]">{children}</div>
    )

} 