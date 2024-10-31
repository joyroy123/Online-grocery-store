import GlobalApi from "@/app/_utils/GlobalApi";
import React from "react";
import TopCategoryList from "../_components/TopCategoryList";
import ProductList from "@/app/_components/ProductList";

async function productCategory({ params }) {
  const productList = await GlobalApi.getProductsByCategory(
    params.categoryName
  );
  const categoryList = await GlobalApi.getCategoryList();

  return (
    <div>
      <h2 className="p-4 bg-primary text-white font-bold text-3xl uppercase text-center">
        {params.categoryName}
      </h2>
      <TopCategoryList categoryList={categoryList} selectedCategory={params.categoryName}/>

      {productList.length === 0 ? (
        <h2 className="flex justify-center mt-10 text-3xl">Oops! No Products Found in the Category.</h2>
      ) : (
        <div className="p-5 md:p-10">
          <ProductList productList={productList} />
        </div>
      )}
    </div>
  );
}

export default productCategory;
