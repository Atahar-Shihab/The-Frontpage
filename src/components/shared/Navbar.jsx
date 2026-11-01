'use client';
import Link from 'next/link';
import Image from 'next/image';
import userAvatar from '@/assets/user.png';
import NavLink from './NavLink';
import BrandLogo from './BrandLogo';
import { authClient } from '@/lib/auth-client';
const Navbar = () => {
    const {data: session} = authClient.useSession();
    console.log(session);
    return (
        <nav aria-label="Main navigation" className="border-b border-slate-200 bg-white">
            <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 py-3 sm:px-6">
                <div className="hidden sm:block"><BrandLogo compact /></div>
                <ul className="flex items-center gap-3 text-xs font-medium sm:gap-7 sm:text-sm">
                    <li className="hover:text-indigo-700"><NavLink href="/">Home</NavLink></li>
                    <li className="hover:text-indigo-700"><NavLink href="/about">About</NavLink></li>
                    <li className="hover:text-indigo-700"><NavLink href="/career">Career</NavLink></li>
                </ul>
                <div className="flex items-center gap-3">
                    <Image src={userAvatar} alt="" width={36} height={36} className="hidden rounded-full sm:block" />
                    <Link href="/login" className="rounded-full bg-indigo-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700">
                  
                        Sign in
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
