import { useState } from 'react';
import { AdvancedMarker } from '@vis.gl/react-google-maps';
import { EventsProps } from '../../types';
import { CalendarIcon, MapPinIcon, TicketIcon } from '@heroicons/react/24/outline';
import dayjs from 'dayjs';

const ASSETS_URL = import.meta.env.VITE_ASSETS_URL;

export const CardMarker = (event: EventsProps) => {

    const [open, setOpen] = useState(false)
    const [zIndex, setZIndex] = useState(0)

    return (
        <AdvancedMarker
            zIndex={zIndex}
            onMouseEnter={() => setZIndex(100)}
            onMouseLeave={() => setZIndex(open ? 100 : 0)}
            position={event.location}
        >
            {
                open && <div className="w-70 py-3 px-3 pt-8 ">
                    <div className="w-68 bg-white border-1 border-gray-200 shadow-md rounded-lg">
                        <div className='text-emerald-600 pt-2 px-3 leading-snug font-semibold text-sm'>
                            {event.name}
                        </div>
                        <div className='py-3 px-3 '>
                            <div
                                className={
                                    `bg-[url('${ASSETS_URL}/events/${event.image}')]
                                    bg-center bg-cover bg-no-repeat
                                    border-0 
                                    border-emerald-500 
                                    rounded-xl 
                                    h-30`
                                }
                            />
                            <div className="flex items-center gap-1 grow text-black mt-2 leading-snug  font-semibold">
                                <MapPinIcon className="flex-none size-4 text-gray-400" />
                                <a className="text-xs" href="javascript:void()">{event.arena}</a>
                            </div>
                            <div className='flex my-2 gap-[10px] text-xs'>
                                <div className=" text-emerald-600 basis-1/6 font-semibold ">
                                    CAD {event.price}
                                </div>
                                <div className="flex items-center justify-center gap-1 basis-1/4 ">
                                    <TicketIcon className="flex-none size-4 text-gray-400" />
                                    <span>{event.tickets}</span>
                                </div>
                                {
                                    event.start_date &&
                                    <div className="flex items-center justify-items-end gap-1 basis-1/2">
                                        <CalendarIcon className="flex-none size-4 text-gray-400" />
                                        <span>{dayjs.unix(event.start_date)?.format('ll')} {(event.end_date && event.end_date !== event.start_date) && `- ${dayjs.unix(event.end_date)?.format('ll')}`}</span>
                                    </div>
                                }
                            </div>
                            <div className='text-'>{event.description}</div>
                            <div className='flex items-center justify-center gap-15 pt-4'>
                                <button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    className={`
                                        py-2 w-[100px] text-center 
                                        bg-white border-emerald-700 
                                        rounded-full bg-gray-300 
                                        text-emerald-700 
                                        font-bold 
                                        cursor-pointer 
                                        border-1
                                        hover:bg-emerald-50 
                                    `}
                                >
                                    Close
                                </button>
                                <button
                                    type="button"
                                    onClick={() => alert()}
                                    className="hover:bg-emerald-600 py-2 w-[100px] text-center rounded-full bg-emerald-700 text-white font-bold cursor-pointer"
                                >
                                    Buy ticket
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {
                !open &&
                <button
                    className="w-20 bg-white hover:bg-emerald-600 text-emerald-700 hover:text-white border-1 border-emerald-600 rounded-full text-xs font-black py-2 px-3 shadow-lg"
                    onClick={() => setOpen(true)}
                >
                    CAD {event.price}
                </button>
            }
        </AdvancedMarker>
    )
}