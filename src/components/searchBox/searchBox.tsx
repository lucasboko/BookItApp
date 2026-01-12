import {
    DatePicker,
    PlaceAutocomplete,
    RangeSlider,
} from '..'

import { SearchBoxProps } from '../../types'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { useClickOutside } from '../../utilities'
import { useState } from 'react'

export const SearchBox = (props: SearchBoxProps) => {

    const { setSelectedPlace, range, setRange } = props
    
    const [open, setOpen] = useState<boolean>(false)
    const searchRef = useClickOutside(() => setOpen(false))
    
    const city = 'Montreal', province = 'QC', country = 'Canada'

    return (
        <div className='flex grow gap-5 items-center ' >
            <span className='text-emerald-700 '>{`${city}, ${province}, ${country} - March 12 - 16, 2025 - ${range}km`}</span>
            <MagnifyingGlassIcon
                className="flex-none size-5 text-gray-400"
                onClick={() => setOpen(!open)}
            />
            <div 
            ref={searchRef} 
            className={`
                flex flex-wrap
                ${open ? 'block' : 'hidden'} 
                border-1 border-gray-100 
                w-[350px]
                absolute top-[70px]
                bg-white shadow-md rounded-lg 
                gap-5
                p-5
            `}>
                <span className="font-bold text-emerald-700">Search</span>
                <DatePicker width="w-full" label="From" leftLabel rightIcon />
                <DatePicker width="w-full" label="To" leftLabel rightIcon />
                <PlaceAutocomplete width="w-full" onPlaceSelect={setSelectedPlace} />
                <RangeSlider
                    width="w-full"
                    setRange={setRange}
                    range={range}
                    step={2}
                    min={2}
                />
            </div>
        </div>
    )
}
