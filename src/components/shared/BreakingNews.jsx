import React from 'react';
import Marquee from 'react-fast-marquee';

import data from '@/demo-data/news.json';

const BreakingNews = () => {
    return (

        <div className='bg-gray-200 px-2 py-4 flex items-center justify-between gap-4 container mx-auto'>
            <button className=' btn bg-red-600 text-white border-0 rounded-none  hover:bg-pink-800 hover:text-white'>
                Latest News
            </button>
            <Marquee speed={100}  gradient={false} pauseOnHover={true}>
                <span className='text-purple-500 font-semibold'>
                    {
                        data.map((item, index) => (
                            <span key={index} className='mx-9'>
                                {item.title}
                            </span>
                        ))
                    }
                </span>
            </Marquee>
        </div>
    );
};

export default BreakingNews;