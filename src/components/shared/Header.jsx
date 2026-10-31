import React from 'react';
import logo from '@/assets/logo.png';
import Image from 'next/image';
import CurrentDate from './CurrentDate';
const Header = () => {
    return (
        <div className='text-center py-8 space-y-2'>
            <Image className='mx-auto' src={logo} alt="Logo" width={300} height={200} />
        
            <p>Journalism Without Fear or Favour</p>
            <CurrentDate />

            </div>
  
);
};

export default Header;
