"use client";

import { Button } from "@/components/ui/button";
import { LoaderCircle, ShoppingBasket } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import GlobalApi from "../_utils/GlobalApi";
import { toast } from "sonner";
import { UpdateCartContext } from "../_context/UpdateCartContext";

function ProductItemDetail({ product }) {

  const jwt = sessionStorage.getItem("jwt");
  const user = JSON.parse(sessionStorage.getItem("user"));
  const {updateCart, setUpdateCart} = useContext(UpdateCartContext);
  const [productTotalPrice, setProductTotalPrice] = useState(
    product.sellingPrice ? product.sellingPrice : product.mrp
  );
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const [loading, setLoading] = useState(false);


  const addToCart = ()=> {

    setLoading(true);
    if (!jwt) {
      router.push("/sign-in");
      setLoading(false);
      return ;
    }

    const data = {
      data: {
        quantity: quantity,
        amount: (quantity * productTotalPrice).toFixed(2),
        products: product.id,
        users_permissions_users: user.id,
        userId: user.id,
      }
    };

    // console.log("data",data);

    GlobalApi.addToCart(data, jwt).then(resp =>{
      // console.log("resp",resp);
      toast("Added to Cart");
      setUpdateCart(!updateCart);
      setLoading(false);
    },(e)=>{
      toast("Error while Adding into cart!");
      setLoading(false);
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 p-7 bg-white text-black">
      <Image
        src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + product.images[0].url}
        unoptimized={true}
        alt={product.name}
        width={300}
        height={300}
        className="bg-slate-200 p-5 h-[320px] w-[300px] object-contain rounded-lg"
      />

      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-bold">{product.name}</h2>
        <h2 className="text-sm font-semibold text-gray-500">
          {product.description}
        </h2>
        <div className="flex gap-3">
          {product.sellingPrice && (
            <h2 className="font-bold text-xl">৳{product.sellingPrice}</h2>
          )}
          <h2
            className={`font-bold text-xl ${
              product.sellingPrice && "line-through text-gray-500 font-semibold"
            }`}
          >
            ৳{product.mrp}
          </h2>
        </div>
        <h2 className="font-medium text-sm">
          Quantity:{" "}
          <span className="font-bold">{product.itemQuantityType}</span>
        </h2>
        <div className="flex flex-col items-baseline gap-3">
          <div className="flex gap-3 items-center">
            <div className="p-2 border flex gap-10 items-center px-5">
              <button disabled={quantity==1} onClick={()=>setQuantity(quantity - 1)}>-</button>
              <h2>{quantity}</h2>
              <button onClick={()=>setQuantity(quantity + 1)}>+</button>
            </div>
            <h2 className="text-xl font-bold"> = ৳{(quantity * productTotalPrice).toFixed(2)}</h2>
          </div>
          <Button className="flex gap-3" onClick={()=> addToCart()} disabled={loading}>
            <ShoppingBasket />
            {loading ? <LoaderCircle className="animate-spin"/> :"Add To Cart"}
          </Button>
        </div>
        <h2 className="font-medium text-sm">
          Category:{" "}
          <span className="font-bold">{product.categories[0].name}</span>
        </h2>
      </div>
    </div>
  );
}

export default ProductItemDetail;
