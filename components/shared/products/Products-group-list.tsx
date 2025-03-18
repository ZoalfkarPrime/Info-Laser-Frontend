import React from "react";
import {cn} from "@/lib/utils";
import {ProductCard} from "@/components/shared/products/Product-card";
import {Product} from "@/types/types";
import {ClassName} from "@/types/types";

interface ProductsGroupListProps extends ClassName {
  products: Product[];
}

export const ProductsGroupList: React.FC<ProductsGroupListProps> = ({products, className}) => {
  return (
    <ul className={cn("grid grid-cols-3 gap-10", className)}>
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard
            {...product}
          />
        </li>
      ))}
    </ul>
  );
};
