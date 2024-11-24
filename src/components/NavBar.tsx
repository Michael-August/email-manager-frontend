"use client"

import { useRouter } from 'next/navigation';
import React from 'react'

const NavBar = () => {
    const router = useRouter()
    return (
        <div className='py-5 px-5 flex items-center justify-between shadow-md'>
            <div className="logo">
                <span className='text-base font-semibold'>SteveCapitals</span>
            </div>
            <span onClick={() => { localStorage.removeItem("token"); router.push("/")}} className='hover:underline text-sm cursor-pointer'>sign out</span>
        </div>
    )
}

export default NavBar