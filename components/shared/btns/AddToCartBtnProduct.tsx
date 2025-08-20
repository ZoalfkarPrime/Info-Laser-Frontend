'use client';

import React from "react";
import {ShoppingCart} from "lucide-react";
import {useCart} from "@/context/CartContext";
import {Product} from "@/types/types";
import {ClassName} from "@/types/types";
import {Button} from "@/components/ui/Button";

interface AddToCartButtonProps extends ClassName {
  product: Product;
}

export const AddToCartBtnProduct: React.FC<AddToCartButtonProps> = ({product}) => {
  const {addToCart, cart} = useCart();

  const cartItem = cart.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <Button
      variant="violet"
      size="violet"
      onClick={() => addToCart(product)}
    >
      <ShoppingCart className="w-5 h-5 mr-3 text-white transition-all duration-300"/>
      {quantity > 0 && (
        <span
          className="absolute top-[-5px] right-[-5px] w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full flex items-center justify-center">
          {quantity}
        </span>
      )}
      Заказать
    </Button>
  );
};
