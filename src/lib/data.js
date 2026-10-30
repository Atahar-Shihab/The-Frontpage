export async function getdata(){

  const res = await fetch('https://openapi.programming-hero.com/api/news/categories')

  const data = await res.json()

  return data.data.news_category


}
export async function getdataByCategory(categoryId){

  const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`)

  const data = await res.json()

  return data


}
