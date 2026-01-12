import { UserCircleIcon, Bars3Icon } from '@heroicons/react/24/solid'
import { clearAuth, useClickOutside } from '../../utilities';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const ASSETS_URL = import.meta.env.VITE_ASSETS_URL;


export const MenuBox = () => {

    const [open, setOpen] = useState<boolean>(false)
    const menuBoxRef = useClickOutside(() => setOpen(false))
    const navigate = useNavigate()
    const isLoggedIn = true
    const hasProfilePic = true

    const logout = () => {
        clearAuth()
        navigate(0)
    }

    return (
        <div ref={menuBoxRef} className='w-[55px]' >
            <button className="flex items-center gap-[5px] cursor-pointer" onClick={() => setOpen(!open)}>
                {
                    isLoggedIn
                        ? <>
                            <Bars3Icon className='size-5 text-emerald-700' />
                            {
                                !hasProfilePic
                                    ? <UserCircleIcon className='size-7 text-emerald-700' />
                                    : <img
                                        src={`${ASSETS_URL}/profile/profile_image.jpg`}
                                        alt="profile image"
                                        width="25"
                                        className='rounded-full justify-self-start'
                                    />
                            }

                        </>
                        : <span className='font-bold text-emerald-700'>Login</span>

                }
            </button>
            {
                isLoggedIn &&
                <div
                    className={`
                                flex flex-wrap
                                ${open ? 'block' : 'hidden'} 
                                border-1 border-gray-200 
                                w-[150px]
                                absolute top-[70px] right-[35px]
                                bg-white shadow-md rounded-lg 
                                gap-5
                                p-5
                            `}>
                    <span className="font-bold">Profile</span>
                    <span className="font-bold">Dashboard</span>
                    <span className="font-bold text-red-700 cursor-pointer" onClick={() => logout()}>Logout</span>

                </div>
            }
        </div>
    )
}