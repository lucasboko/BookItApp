import {
    MenuBox,
    SearchBox,
    AddEvent,
} from '..'
import { useAppContext } from '../../context/AppContext';


import BookItLogo from '/bookIt.svg';

const ASSETS_URL = import.meta.env.VITE_ASSETS_URL;


export const Header = () => {


    return (
        <div className='w-full bg-white flex items-center gap-6 px-10 h-[90px] fixed z-10 border-b-1 border-gray-200'>

            <img src={BookItLogo} alt="App Logo" width="80" className='justify-self-start' />
            <SearchBox />
            <AddEvent />
            <MenuBox />

        </div>
    )
}