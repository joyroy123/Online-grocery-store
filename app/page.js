import Image from "next/image";
import CategoryList from "./_components/CategoryList";
import ProductList from "./_components/ProductList";
import Slider from "./_components/Slider";
import GlobalApi from "./_utils/GlobalApi";

export default async function Home() {

  const sliderList = await GlobalApi.getSliders();
  const categoryList = await GlobalApi.getCategoryList();
  const productList = await GlobalApi.getAllProducts();

  return <div className="p-5 md:p-10 px-16">
    <Slider sliderList={sliderList} />
    <CategoryList categoryList={categoryList} />
    <ProductList productList={productList} />
    <Image src="/banner.png" alt="banner" width={1000} height={300} className="w-full h-[400px] object-contain"/>
  </div>;
}
