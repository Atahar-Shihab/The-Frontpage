import { redirect } from "next/navigation";

export default async function Home() {

  redirect('/category/0')
  
  return null;
}
