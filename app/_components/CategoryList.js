import Image from "next/image";
import Link from "next/link";
import React from "react";

function CategoryList({ categoryList }) {
  return (
    <div className="mt-5">
      <h2 className="text-green-600 font-bold text-2xl">Shop By Category</h2>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-5 mt-2">
        {categoryList.map((category, index) => (
          <Link href={"/products-category/" + category.name} key={index} className="flex flex-col items-center bg-green-50 gap-2 p-3 rounded-lg cursor-pointer hover:scale-105 transition-all ease-in-out hover:bg-green-200">
            <Image src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + category.icon[0].url} unoptimized={true} alt="icon" width={50} height={50} />
            
            <h2 className="text-green-800 uppercase font-semibold">{category.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategoryList;
