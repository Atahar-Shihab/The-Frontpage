import React from 'react';
import { FaGoogle, FaGithub } from 'react-icons/fa';
const RightSidebar = () => {
    return (
        <div>
            <h2 className="font-bold text-lg">Login With</h2>
            <div className='flex flex-col gap-2 mt-3'>

            <button className='btn flex items-center gap-2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600'><FaGoogle /> Login with Google</button>
            <button className='btn flex items-center gap-2 bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600'><FaGithub /> Login with GitHub</button>
            </div>
            
        </div>
    );
};

export default RightSidebar;