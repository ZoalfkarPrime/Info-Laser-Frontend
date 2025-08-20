import React from "react";
import {cn} from "@/lib/utils";
import {ProductCard} from "@/components/shared/products/ProductCard";
import {Product} from "@/types/types";
import {ClassName} from "@/types/types";
import {OfflineOrOnlineMain} from "@/components/shared/banners/OfflineOrOnlineMain";
import {CustomDelivery} from "@/components/shared/banners/CustomDelivery";

interface ProductsGroupListProps extends ClassName {
  products: Product[];
}

export const ProductsGroupList: React.FC<ProductsGroupListProps> = ({products, className}) => {
  return (
    <ul className={cn(
      "grid grid-cols-3 gap-5",
      "max-xl:grid-cols-2",
      "max-md:gap-2",
      className
    )}>
      {products.map((product, index) => (
        <React.Fragment key={product.id}>
          <li>
            <ProductCard {...product} />
          </li>
          {index === 5 && (
            <li className="col-span-full">
              <OfflineOrOnlineMain className={"[&>div]:px-0 [&>div>div]:py-5 [&>div>div>div]:max-w-[500px]"}/>
            </li>
          )}
          {index === 11 && (
            <li className="col-span-full">
              <CustomDelivery className={"[&>div]:px-0"}/>
            </li>
          )}
        </React.Fragment>
      ))}
    </ul>
  );
};
