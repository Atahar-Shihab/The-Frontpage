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
export async function getNewsDetailsById(id){

  const res = await fetch(`https://openapi.programming-hero.com/api/news/${id}`)

  const data = await res.json()

  // The details endpoint returns the matching story inside a one-item array.
  // Keep callers working with a single story object, like the category list does.
  return Array.isArray(data.data) ? data.data[0] : data.data


}
