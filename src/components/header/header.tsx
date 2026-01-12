import {
    MenuBox,
    SearchBox,
    AddEvent,
} from '..'
import { HeaderProps } from '../../types'

import BookItLogo from '/bookIt.svg';

const ASSETS_URL = import.meta.env.VITE_ASSETS_URL;


export const Header = (props: HeaderProps) => {

    const { setSelectedPlace, range, setRange } = props

    return (
        <div className='w-full bg-white flex items-center gap-6 px-10 h-[90px] fixed z-10 border-b-1 border-gray-200'>

            {/* <div className='w-30'>
                
            </div> */}
            <img src={BookItLogo} alt="App Logo" width="80" className='justify-self-start' />
            <SearchBox
                setSelectedPlace={setSelectedPlace}
                range={range}
                setRange={setRange}
            />
            <AddEvent />
            <MenuBox />

        </div>
    )
}