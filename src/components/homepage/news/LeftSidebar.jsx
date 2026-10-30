import Link from 'next/link';
import React from 'react';

const LeftSidebar = ({categories,activeId}) => {
    return (
        <div>
            <ul className="flex flex-col gap-3 gap-y-4 mt-4">

                {categories.map(category => <li key={category.category_id} className={activeId === category.category_id ? "bg-purple-400 p-2 rounded-lg" : "bg-purple-200 p-2 rounded-lg hover:bg-purple-400 cursor-pointer"}>
                    <Link className='block' href={`/category/${category.category_id}`}>{category.category_name}</Link>

                </li>)

                }

            </ul>
        </div>
    );
};

export default LeftSidebar;