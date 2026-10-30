import LeftSidebar from "@/components/homepage/news/LeftSidebar"


async function getdata(){

  const res = await fetch('https://openapi.programming-hero.com/api/news/categories')

  const data = await res.json()

  return data.data.news_category


}


export default async function Home() {

  const categories = await getdata()
  

  return <div className='container mx-auto grid grid-cols-12 gap-4 my-15'>

    <div className= "text-center  col-span-3">
      <h2 className="font-bold text-lg">
      All Categories
      </h2>
      <LeftSidebar categories={categories} activeId={"3"} />
    </div>



    <div className="font-bold text-center text-3xl bg-purple-100 col-span-6">All News</div>

    <div className="font-bold text-center text-3xl bg-yellow-100 col-span-3">Socials</div>


    </div>
}
