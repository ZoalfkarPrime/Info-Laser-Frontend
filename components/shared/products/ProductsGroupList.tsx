"use client";

import React, {useMemo} from "react";
import {cn} from "@/lib/utils";
import {ProductCard} from "@/components/shared/products/ProductCard";
import {Product} from "@/types/types";
import {ClassName} from "@/types/types";
import {useSearchParams} from "next/navigation";

interface ProductsGroupListProps extends ClassName {
  products: Product[];
}

export const ProductsGroupList: React.FC<ProductsGroupListProps> = ({products, className}) => {
  const searchParams = useSearchParams();
  const sortBy = searchParams.get("sortBy") as "price" | "popularity" | "sale" | null;
  const sortDirection = searchParams.get("sortDirection") as "asc" | "desc" | null;

  const sortedProducts = useMemo(() => {
    if (!products) return [];

    if (sortBy === "sale") {
      return products.filter((p) => p.labels?.some((label) => label.slug === "in_sale"));
    }

    if (sortBy === "price") {
      return [...products].sort((a, b) =>
        sortDirection === "desc" ? b.orderPrice - a.orderPrice : a.orderPrice - b.orderPrice
      );
    }

    if (sortBy === "popularity") {
      return [...products].sort((a, b) =>
        sortDirection === "desc" ? b.rating - a.rating : a.rating - b.rating
      );
    }

    return products;
  }, [products, sortBy, sortDirection]);

  return (
    <ul className={cn("grid grid-cols-3 gap-10", className)}>
      {sortedProducts.map((product) => (
        <li key={product.id}>
          <ProductCard {...product} />
        </li>
      ))}
    </ul>
  );
};
