import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import userAvatar from '@/assets/user.png';
import NavLink from './NavLink';

const Navbar = () => {
    return (
        <div className='flex justify-between items-center px-44 py-2 '>
            <div>
                <h1 className='text-2xl font-bold text-blue-300 hover:text-blue-600'>News Portal</h1>
            </div>
            <ul className='flex justify-center gap-5 py-5 '>
                <li className='hover:text-blue-500 hover:underline'><NavLink href="/"> Home</NavLink></li>
                <li className='hover:text-blue-500 hover:underline'><NavLink href="/about">About</NavLink></li>
                <li className='hover:text-blue-500 hover:underline'><NavLink href="/career">Career</NavLink></li>
            </ul>


<div className='flex items-center'>

<Image src={userAvatar} alt="User Avatar" width={50} height={50} className='rounded-full'/>
<button  className='btn bg-blue-500 text-white border-0 rounded-none hover:bg-blue-700 hover:text-white ml-4'>
<Link href={'/login'}>Login</Link>
</button>


</div>


        </div>
    );
};

export default Navbar;