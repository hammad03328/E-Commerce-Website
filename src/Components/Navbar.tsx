// "use client"
import React, { useState } from "react";
import Image from "next/image";
import Spacer from "./Spacer";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useEffect } from "react";
import { getdata } from "@/app/cart/page";
import { cooks } from "@/app/cart/page";
import { todo } from "@/lib/drizzle";

const Navbar = async () => {
  const value = await cooks();

  const new_array1 =
    value?.map((item: todo) => {
      return item.quantity;
    }) || [];

  const T_quan: number = (await Promise.all(new_array1)).reduce(
    (sum, quantity) => sum + quantity,
    0
  );

  return (
    <Spacer>
      <div className="flex justify-between place-items-center gap-5 text-black font-sans bg-slate-200a mt-8">
        <div>
          <Link href="/">
            <Image
              src="/Logo/Clogo.webp"
              alt="c_logo"
              width={130}
              height={20}
            />
          </Link>
        </div>
        <div>
          <ul className="flex gap-10 justify-center place-items-center">
            <Link href="/Female">
              <li className="active:scale-110  hover:cursor-pointer">Female</li>
            </Link>
            <Link href="/Male">
              <li className="active:scale-110  hover:cursor-pointer">Male</li>
            </Link>
            <Link href="/Kids">
              <li className="active:scale-110  hover:cursor-pointer">Kids</li>
            </Link>
            <Link href="/AllProd">
              <li className="active:scale-110  hover:cursor-pointer">
                All Products
              </li>
            </Link>
          </ul>

          {/* <SignedIn>

        <UserButton afterSignOutUrl="/"/>
      </SignedIn> */}
        </div>
        <div className="flex place-items-center border-gray-400 border rounded-lg">
          <div className="mx-2">
            <FaSearch />
          </div>
          <input
            className="w-min-xs bg-red-400a mr-1 rounded-sm text-base"
            placeholder="What you looking for"
          ></input>
        </div>
        {/* <UserButton afterSignOutUrl="/"/> */}
        <Link href="/cart">
          <div className="relative active:scale-110 duration-300 shrink-0 w-14 h-14 bg-gray-300 flex justify-center place-items-center rounded-full scale-75 ">
            <div className="scale-125 font-bold">
              <AiOutlineShoppingCart />
            </div>
            <div className="absolute right-0 top-0 w-6 h-6 rounded-full bg-red-500 text-center">
              <p className="text-white text-center my-auto font-semibold text-sm">
                {T_quan}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </Spacer>
  );
};

export default Navbar;
