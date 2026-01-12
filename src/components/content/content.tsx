import { useEffect, useState } from 'react';

import {
    GoogleMap,
    Event
} from '..'
import { useMapsLibrary } from '@vis.gl/react-google-maps';
import { getEvents } from '../../utilities'
import { EventsProps, contentProps } from '../../types'

export const Content = (props: contentProps) => {

    const { selectedPlace, range } = props
    const [filteredEvents, setFilteredEvents] = useState<EventsProps[] | []>([])

    const geometry = useMapsLibrary('geometry');
    const loadEvents = async () => {

        const filtered = await getEvents({selectedPlace, range, geometry})

        setFilteredEvents(filtered)

    }
    useEffect(() => {

        loadEvents()

    }, [])

    console.log(filteredEvents)

    return (
        <div className='grid grid-cols-2 fixed top-[90px] h-[calc(100%-140px)] w-full'>
            <div className='flex-none grid grid-cols-2 content-start gap-15 p-[30px] overflow-y-scroll'>
                {
                    filteredEvents.map((item, index) => item && <Event key={index} {...item} />)
                }
            </div>
            <div className="">
                <GoogleMap place={selectedPlace} events={filteredEvents} range={range} />
            </div>
        </div>
    )
}
