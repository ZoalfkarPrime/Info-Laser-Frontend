'use client';

import React from "react";
import {Button} from "@/components/ui/Button";
import {Plus} from "lucide-react";
import {useCart} from "@/context/Cart-context";
import {Product} from "@/types/product";

interface AddToCartButtonProps {
  product: Product;
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({product}) => {
  const {addToCart} = useCart();

  return (
    <Button variant="outline" className="text-base font-bold mb-2" onClick={() => addToCart(product)}>
      <Plus className="w-5 h-5 mr-1"/> В корзину
    </Button>
  );
};
