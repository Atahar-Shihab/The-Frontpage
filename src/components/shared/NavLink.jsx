"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
const NavLink = ({ href, children }) => {
    const pathname= usePathname();

    return (
        <Link href={href}
             className={` ${pathname === href ? 'text-blue-500 font-bold  border-b-2 border-b-purple-500' : 'text-gray-700'}`}>
                {children}
        
        </Link>
    );
};

export default NavLink;