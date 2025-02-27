import {cn} from "@/lib/utils";
import {ProductCard} from "@/components/shared/products/Product-card";
import React from "react";
import {ProductsGroupListProps} from "@/types/product";

export const ProductsGroupList: React.FC<ProductsGroupListProps> = ({products}) => {

  return (
    <ul className={cn('grid grid-cols-3 gap-10')}>
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard
            className={cn('')}
            id={product.id}
            name={product.name}
            slug={product.slug}
            stockPrice={product.stockPrice}
            orderPrice={product.orderPrice}
            inStock={product.inStock}
            isHit={product.isHit}
            categorySlug={product.categorySlug}
            categoryName={product.categoryName}
            description={product.description}
            newPrice={0}
            image={product.images?.[0]}
          />
        </li>
      ))}

    </ul>
  );
};
