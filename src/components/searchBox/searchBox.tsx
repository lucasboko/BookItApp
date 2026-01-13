import {
    DatePicker,
    PlaceAutocomplete,
    RangeSlider,
} from '..'

import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { useClickOutside } from '../../utilities'
import { useState } from 'react'
import { useAppContext } from '../../context/AppContext'

export const SearchBox = () => {

    const { 
        selectedPlace, 
        setSelectedPlace, 
        range, 
        setRange,

        start_date,
        end_date,
        setStartDate,
        setEndDate,

    } = useAppContext()

    const [open, setOpen] = useState<boolean>(false)
    const searchRef = useClickOutside(() => setOpen(false))


    return (
        <div className='flex grow gap-5 items-center ' >
            <span className='text-emerald-700 '>{`${selectedPlace?.formatted_address} - ${range}km`}</span>
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
                <DatePicker
                    name="start_date"
                    onChange={setStartDate}
                    value={start_date}

                    width="w-full"
                    label="From"
                    leftLabel
                    rightIcon
                />
                <DatePicker
                    name="end_date"
                    onChange={setEndDate}
                    value={end_date}

                    width="w-full"
                    label="To"
                    leftLabel
                    rightIcon
                />
                <PlaceAutocomplete 
                    width="w-full" 
                    onPlaceSelect={setSelectedPlace} 
                />
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
