"use client";

import GlobalApi from "@/app/_utils/GlobalApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowBigRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function Checkout() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const jwt = sessionStorage.getItem("jwt");
  const [totalCartItem, setTotalCartItem] = useState(0);
  const [cartItemList, setCartItemList] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [zip, setZip] = useState();
  const [address, setAddress] = useState();
  const router = useRouter();

  useEffect(() => {
    if (!jwt) {
        router.push("/sign-in");
    }
    getCartItems();
  }, []);

  const getCartItems = async () => {
    const cartItemList_ = await GlobalApi.getCartItems(user.id, jwt);
    console.log("cartList", cartItemList_);
    setTotalCartItem(cartItemList_?.length);
    setCartItemList(cartItemList_);
  };

  useEffect(() => {
    let total = 0;
    cartItemList.forEach((element) => {
      total = total + element.amount;
    });
    setSubTotal(total);
  }, [cartItemList]);

  const calculateTotalAmount = () => {
    const totalAmount = (subTotal + 100).toFixed(2);
    return totalAmount;
  };

  return (
    <div className="">
      <h2 className="p-3 bg-primary text-xl font-bold text-center text-white">
        Checkout
      </h2>
      <div className="p-5 px-5 md:px-10 grid grid-cols-1 md:grid-cols-3 py-8 gap-5">
        <div className="md:col-span-2 mx-20">
          <h2 className="font-bold text-3xl">Billing Details</h2>
          <div className="grid grid-cols-2 gap-10 mt-3">
            <Input placeholder="Name" onChange={(e)=>setUsername(e.target.value)}/>
            <Input placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
          </div>
          <div className="grid grid-cols-2 gap-10 mt-3">
            <Input placeholder="Phone" onChange={(e)=>setPhone(e.target.value)}/>
            <Input placeholder="Zip" onChange={(e)=>setZip(e.target.value)}/>
          </div>
          <div className="mt-3">
            <Input placeholder="Address" onChange={(e)=>setAddress(e.target.value)}/>
          </div>
        </div>
        <div className="mx-10 border">
          <h2 className="p-3 bg-gray-200 font-bold text-center">
            Total Cart ({totalCartItem})
          </h2>
          <div className="p-4 flex flex-col gap-4">
            <h2 className="font-bold flex justify-between">
              Subtotal: <span>৳{subTotal.toFixed(2)}</span>
            </h2>
            <hr />
            <h2 className="flex justify-between">
              Delivery Charge: <span>৳80.00</span>
            </h2>
            <hr />
            <h2 className="font-bold flex justify-between">
              Total: <span>৳{calculateTotalAmount()}</span>
            </h2>
            <Button>
              Payment <ArrowBigRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
