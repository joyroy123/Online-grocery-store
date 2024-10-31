"use client";

import { Button } from "@/components/ui/button";
import {
  CircleUserRound,
  LayoutGrid,
  ShoppingBasket,
} from "lucide-react";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import GlobalApi from "../_utils/GlobalApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UpdateCartContext } from "../_context/UpdateCartContext";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CartItemList from "./CartItemList";
import { toast } from "sonner";
import SearchBar from "./SearchBar";

function Header() {
  const [categoryList, setCategoryList] = useState([]);
  const isLogin = sessionStorage.getItem("jwt") ? true : false;
  const user = JSON.parse(sessionStorage.getItem("user"));
  const jwt = sessionStorage.getItem("jwt");
  const [totalCartItem, setTotalCartItem] = useState(0);
  const { updateCart, setUpdateCart } = useContext(UpdateCartContext);
  const [cartItemList, setCartItemList] = useState([]);
  const router = useRouter();
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    getCategoryList();
  }, []);

  useEffect(() => {
    getCartItems();
  }, [updateCart]);

  const getCategoryList = () => {
    GlobalApi.getCategory().then((resp) => {
      setCategoryList(resp.data.data);
    });
  };

  const getCartItems = async () => {
    const cartItemList_ = await GlobalApi.getCartItems(user.id, jwt);
    console.log("cartList", cartItemList_);
    setTotalCartItem(cartItemList_?.length);
    setCartItemList(cartItemList_);
  };

  const onSignOut = () => {
    sessionStorage.clear();
    router.push("/sign-in");
  };

  const onDeleteItem = (id) => {
    GlobalApi.deleteCartItem(id, jwt).then((resp) => {
      toast("Item Removed!");
      getCartItems();
    });
  };



  useEffect(() => {
    let total = 0;
    cartItemList.forEach((element) => {
      total = total + element.amount;
    });
    setSubTotal(total);
  }, [cartItemList]);

  return (
    <div className="p-5 shadow-sm flex justify-between">
      <div className="flex items-center gap-8">
        <Link href={"/"}>
          <Image src="/logo.png" alt="logo" width={100} height={50}/>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <h2 className=" hidden md:flex gap-2 items-center border rounded-full p-2 px-10 bg-slate-200 cursor-pointer">
              <LayoutGrid className="h-5 w-5" /> Category
            </h2>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Browse Category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {categoryList.map((category, index) => (
              <Link key={index} href={"/products-category/" + category.name}>
                <DropdownMenuItem className="flex gap-2 items-center cursor-pointer">
                  <Image
                    src={
                      process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
                      category.icon[0].url
                    }
                    unoptimized={true}
                    alt="icon"
                    width={30}
                    height={30}
                  />

                  <h2 className="uppercase font-semibold">{category.name}</h2>
                </DropdownMenuItem>
              </Link>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <SearchBar />
      </div>

      <div className="flex gap-5 items-center">
        <Sheet>
          <SheetTrigger>
            <h2 className="flex items-center gap-2 text-lg">
              <ShoppingBasket className="h-7 w-7 cursor-pointer hover:text-green-600 hover:scale-95 transition-all ease-in-out" />{" "}
              <span className="bg-primary text-white px-2 rounded-full">
                {totalCartItem}
              </span>
            </h2>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="bg-primary text-white font-bold text-lg p-2 mt-3 justify-center">
                My Cart
              </SheetTitle>
              <SheetDescription>
                <CartItemList
                  cartItemList={cartItemList}
                  onDeleteItem={onDeleteItem}
                />
              </SheetDescription>
            </SheetHeader>
            <SheetClose asChild>
              <div className="flex flex-col gap-2 absolute w-[90%] bottom-6">
                <h2 className="flex justify-between text-lg font-bold">
                  Subtotal: <span>৳{subTotal.toFixed(2)}</span>
                </h2>
                <Button onClick={()=> router.push(jwt ? "/checkout" : "/sign-in")}>Checkout</Button>
              </div>
            </SheetClose>
          </SheetContent>
        </Sheet>

        {!isLogin ? (
          <Link href={"/sign-in"}>
            <Button>Login</Button>
          </Link>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <CircleUserRound className="bg-green-100 p-2 rounded-full text-primary h-12 w-12 cursor-pointer hover:scale-110 transition-all ease-in-out" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                My Orders
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onSignOut()}
                className="cursor-pointer"
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
}

export default Header;
