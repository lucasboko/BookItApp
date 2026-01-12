import { CalendarIcon, HomeModernIcon, MapPinIcon, TicketIcon } from "@heroicons/react/24/outline"
import { EventsProps } from "../../types"
import dayjs from "dayjs";

const ASSETS_URL = import.meta.env.VITE_ASSETS_URL;
console.log(ASSETS_URL)

export const Event = (props: EventsProps) => {
    const {
        name,
        description,
        image,
        price,
        tickets,
        arena,
        location,
        start_date,
        end_date,

    } = props

    return (
        <div>
            <div
                className={
                    `bg-[url('${ASSETS_URL}/events/${image}')]
                bg-center bg-cover bg-no-repeat
                border-0 
                border-emerald-500 
                rounded-2xl 
                h-50`
                }
            />
            <div className=" text-emerald-600 my-2 leading-snug  font-semibold">
                {name}
            </div>
            
            <div className="flex  items-center gap-1 grow text-black mt-2 leading-snug  font-semibold">
                <MapPinIcon className="flex-none size-4 text-gray-400" />
                <a href="javascript:void()">{arena}</a>
            </div>

            <div className="flex mt-2 gap-[10px] font-semibold">
                <div className=" text-emerald-600 basis-1/4">
                    CAD {price}
                </div>
                <div className="flex items-center  justify-end gap-1 basis-1/4  ">
                    <TicketIcon className="flex-none size-4 text-gray-400" />
                    <span>{tickets}</span>
                </div>
                <div className="flex items-center justify-end gap-1 basis-1/4  ">
                    <HomeModernIcon className="flex-none size-4 text-gray-400" />
                    <span>6</span>
                </div>
            </div>

            {
                start_date && <div className="flex mt-2 gap-[10px]">
                    <div className="flex items-center gap-1">
                        <CalendarIcon className="flex-none size-4 text-gray-400" />
                        <span>{dayjs.unix(start_date)?.format('ll')} {(end_date && end_date !== start_date) && `- ${dayjs.unix(end_date)?.format('ll')}`}</span>
                    </div>
                </div>
            }

            <div className="my-2 text-gray-600">{description}</div>
            
        </div>
    )
}