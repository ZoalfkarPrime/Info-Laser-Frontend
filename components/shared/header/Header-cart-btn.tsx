'use client'

import {ShoppingCart} from "lucide-react";
import Link from "next/link";
import React from "react";
import {useCart} from "@/context/Cart-context";

export const HeaderCartBtn: React.FC = () => {
  const {cart} = useCart();

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Link className="flex items-center gap-1 mx-2 hover:text-red-500 transition duration-300" href={"/cart"}>
      <ShoppingCart size={18} className="relative" strokeWidth={2}/>
      <b>{totalCartItems}</b>
    </Link>
  );
};