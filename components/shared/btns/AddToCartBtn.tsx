'use client';

import React from "react";
import {ShoppingCart} from "lucide-react";
import {useCart} from "@/context/CartContext";
import {cn} from "@/lib/utils";
import {Product} from "@/types/types";
import {ClassName} from "@/types/types";

interface AddToCartButtonProps extends ClassName {
  product: Product;
}

export const AddToCartBtn: React.FC<AddToCartButtonProps> = ({product, className}) => {
  const {addToCart, cart} = useCart();

  const cartItem = cart.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <button
      className={cn(
        "relative flex items-center justify-center w-10  h-10 rounded-full bg-[var(--violet-dark)] transition-colors",
        "hover:cursor-pointer hover:bg-[var(--violet)]/30",
        className
      )}
      onClick={() => addToCart(product)}
    >
      <ShoppingCart className="w-5 h-5 text-[var(--violet)]"/>
      {quantity > 0 && (
        <span
          className="absolute top-[-5px] right-[-5px] w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full flex items-center justify-center">
          {quantity}
        </span>
      )}
    </button>
  );
};
