'use client'

import {ShoppingCart} from "lucide-react";
import Link from "next/link";
import React from "react";
import {useCart} from "@/context/CartContext";
import {cn} from "@/lib/utils";

export const HeaderCartBtn: React.FC = () => {
  const {cart} = useCart();

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Link
      className={cn(
        "flex items-center gap-1 mx-2 hover:text-[var(--violet)] transition duration-300",
        "max-md:mr-10"
      )}
      href={"/cart"}
    >
      <ShoppingCart size={18} className="relative" strokeWidth={2}/>
      <b>{totalCartItems}</b>
    </Link>
  );
};