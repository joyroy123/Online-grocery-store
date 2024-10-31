import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

function TopCategoryList({categoryList, selectedCategory}) {
  return (
    <div className="flex gap-5 mt-2 overflow-auto mx-7 md:mx-20 justify-center">
    {categoryList.map((category, index) => (
      <Link href={"/products-category/" + category.name} key={index} className={`flex flex-col items-center bg-green-50 gap-2 p-3 rounded-lg cursor-pointer hover:scale-95 transition-all ease-in-out hover:bg-green-300 w-[150px] min-w-[100px] ${selectedCategory === category.name && "bg-green-300 text-green-50"}`}>
        <Image src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + category.icon[0].url} unoptimized={true} alt="icon" width={50} height={50} />
        
        <h2 className={`text-green-800 uppercase font-semibold ${selectedCategory === category.name && "text-green-800"}`}>{category.name}</h2>
      </Link>
    ))}
  </div>
  )
}

export default TopCategoryList;