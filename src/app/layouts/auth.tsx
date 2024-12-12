"use client"

import Image from 'next/image'

import HR from '../../../public/hr.jpg'
import { ToastContainer } from 'react-toastify'

export default function AuthLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>
) {
    return (
        <html>
            <body className="flex">
                <ToastContainer
                    position="top-center"
                    closeButton={true}
                />
                <div className="img h-screen w-full">
                    <Image src={HR} alt='' width={0} height={0} />
                </div>
                <div className="flex bg-gray-800 items-center justify-center w-full">
                    {children}
                </div>
            </body>
        </html>
    )
}