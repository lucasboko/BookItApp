import { useState } from 'react';
import { AdvancedMarker } from '@vis.gl/react-google-maps';
import { XCircleIcon } from '@heroicons/react/24/solid'

type CardMarkerProps = {
    price: number
    position: {
        lat: number
        lng: number
    }
}
export const CardMarker = ({ price, position }: CardMarkerProps) => {

    const [open, setOpen] = useState(false)
    const [zIndex, setZIndex] = useState(0)

    return (
        <AdvancedMarker
            zIndex={zIndex}
            onMouseEnter={() => setZIndex(100)}
            onMouseLeave={() => setZIndex(open ? 100 : 0)}
            position={position}
        >
            {
                open && <div className="w-70 h-40 py-3 px-3 pt-8 ">
                    <XCircleIcon className="absolute top-0 right-0 flex-none size-8 text-emerald-700" onClick={() => setOpen(false)} />
                    <div className="w-68 h-38 bg-white py-3 px-3 border-1 border-gray-200 shadow-md rounded-lg">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna
                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    </div>
                </div>
            }
            {
                !open &&
                <button
                    className="w-20 bg-white hover:bg-emerald-600 text-emerald-700 hover:text-white border-1 border-emerald-600 rounded-full text-xs font-black py-2 px-3 shadow-lg"
                    onClick={() => setOpen(true)}
                >
                    CAD {price}
                </button>
            }
        </AdvancedMarker>
    )
}