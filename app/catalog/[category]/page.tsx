import {Container} from "@/components/shared/container";
import {Categories} from "@/components/shared/categories";
import {SortPopup} from "@/components/shared/sort-popup";
import {Filters} from "@/components/shared/filters";
import {cn} from "@/lib/utils";
import {ProductCard} from "@/components/shared/product-card";
import React from "react";
import dataProducts from "@/public/data-products.json";

const products = dataProducts.data;

const Category = ({}) => {
  return (
    <>
      <Container className="pt-5">
        <div className="flex items-center justify-between">
          <Categories/>
          <SortPopup/>
        </div>
      </Container>

      <Container className="mt-10">

        <div className="flex gap-10">

          {/* Фильтрация */}
          <div>
            <Filters/>
          </div>

          {/* Контент */}
          <div>

            <h1 className="text-2xl font-semibold mb-3">Вы выбрали: {products[0].category.name} </h1>

            <ul className={cn('grid grid-cols-5 gap-[20px]')}>
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  slug={product.slug}
                  stockPrice={product.stockPrice}
                  orderPrice={product.orderPrice}
                  image={product.image}
                  category={product.category}
                />
              ))}
            </ul>

          </div>

        </div>
      </Container>
    </>
  );
};

export default Category;