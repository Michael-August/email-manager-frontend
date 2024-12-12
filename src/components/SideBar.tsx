import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SideBar = () => {
    const pathname = usePathname();

    // Sidebar navigation items
    const navItems = [
        {id: 1, name: 'Dashboard', path: '/dashboard' },
        {id: 2, name: 'OnBoarding', path: '' },
        {id: 3, name: 'Employees', path: '' },
        {id: 4, name: 'OffBoarding', path: '/offboard' },
        {id: 5, name: 'Reports', path: '' },
        {id: 6, name: 'Settings', path: '' },
    ];

    return (
        <div className="w-64 h-screen bg-gray-800 text-white flex flex-col p-4">
            <h1 className="text-xl font-bold mb-6">HR Dashboard</h1>
            <nav className="space-y-4">
                {navItems.map((item) => (
                    <Link key={item.id} href={item.path}>
                        <span
                            className={`block px-4 py-2 rounded-md 
                            ${
                                pathname === item.path
                                    ? 'bg-gray-700 text-white'
                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                            }`}
                        >
                            {item.name}
                        </span>
                    </Link>
                ))}
            </nav>
        </div>
    );
};

export default SideBar;
