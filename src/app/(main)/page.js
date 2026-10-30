

async function getdata(){

  const res = await fetch('https://openapi.programming-hero.com/api/news/categories')

  const data = await res.json()

  return data.data.news_category


}


export default async function Home() {

  const categories = await getdata()
  console.log(categories)

  return <div className='container mx-auto grid grid-cols-12 gap-4 my-15'>

    <div className="font-bold text-center text-3xl bg-green-100 col-span-3">All Categories

      <ul className = "flex flex-col gap-3 gap-y-4 mt-4">

        {categories.map(category => <li key={category.category_id} className="bg-purple-200 p-2 rounded-lg hover:bg-purple-400 cursor-pointer">{category.category_name}</li>)

        }

      </ul>
    </div>



    <div className="font-bold text-center text-3xl bg-purple-100 col-span-6">All News</div>

    <div className="font-bold text-center text-3xl bg-yellow-100 col-span-3">Socials</div>


    </div>
}
