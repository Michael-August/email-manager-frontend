"use client"

import { usePathname, useRouter } from 'next/navigation';
import React from 'react'

const NavBar = () => {
    const router = useRouter()
    const pathname = usePathname()
    return (
        <div className='bg-gray-800 text-white py-5 px-5 flex items-center justify-between'>
            <div className="logo">
                <span className='text-xl font-semibold'>SteveCapitals</span>
            </div>
            {(pathname === "/dashboard" || pathname === "/offboard") && <span onClick={() => { localStorage.removeItem("token"); router.push("/")}} className='hover:underline text-sm cursor-pointer'>sign out</span>}
        </div>
    )
}

export default NavBar