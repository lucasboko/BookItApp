import { ModalProps } from "../../types"

export const Modal = (props: ModalProps) => {

    const { children } = props
    return (
        <div className="w-screen h-screen bg-black/70 fixed z-20 pt-10 left-0 top-0 overflow-y-scroll">

            <div className="w-[500px] bg-white rounded-xl m-auto border-1 border-gray-100">
                {children}
            </div>

        </div>
    )

} 