import React from 'react';
import LeftSidebar from '@/components/homepage/news/LeftSidebar';
import RightSidebar from '@/components/homepage/news/RightSidebar';
import { getdata, getdataByCategory } from '@/lib/data';






const NewsCategoryPage = async ({params}) => {
    const {id} = await params;
    console.log(id,"id");
      const categories = await getdata()

  const newsByCategory = await getdataByCategory(id)
    return <div className='container mx-auto grid grid-cols-12 gap-4 my-15'>

    <div className= "text-center  col-span-3">
      <h2 className="font-bold text-lg">
      All Categories
      </h2>
      <LeftSidebar categories={categories} activeId={id} />
    </div>




    <div className="font-bold text-center text-3xl bg-purple-100 col-span-6"><span className="underline"> News by category</span>


      {
        newsByCategory.data.length>0?newsByCategory.data.map(news => <div key={news._id} className="bg-purple-200 mt-6 p-2 rounded-lg my-2">
          <h2 className="font-bold mt-4 text-lg">{news.title}</h2>
          <p>{news.details.slice(0, 200)}...</p>
        </div>):<p className='h-full items-center mt-45'>No news found</p>
      }



    </div>

    <div className=" text-center col-span-3">
      <RightSidebar />
    </div>


    </div>

};

export default NewsCategoryPage;