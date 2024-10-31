"use client";

import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

function SearchBar() {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const handleChange = (query)=>{
        const params = new URLSearchParams(searchParams);

        if (query) {
            params.set("query", query);
        } else {
            params.delete("query");
        }

        router.replace(`${pathname}?${params.toString()}`);
    };

  return (
    <div>
      <div className="md:flex relative items-center gap-3 border rounded-full p-2 px-5 hidden">
        <Search />
        <input
          className="outline-none"
          type="text"
          placeholder="Search"
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
    </div>
  );
}

export default SearchBar;
