"use client";

import React, { Suspense } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ActiveNavLink = ({ href, children }) => {
    const pathname = usePathname();

    return (
        <Link href={href}
            className={pathname === href ? 'border-b-2 border-b-purple-500 font-bold text-blue-500' : 'text-gray-700'}>
            {children}
        </Link>
    );
};

const NavLink = ({ href, children }) => (
    <Suspense fallback={<Link href={href} className="text-gray-700">{children}</Link>}>
        <ActiveNavLink href={href}>{children}</ActiveNavLink>
    </Suspense>
);

export default NavLink;
