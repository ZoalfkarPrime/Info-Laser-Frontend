import {Container} from "@/components/shared/Container";
import {Categories} from "@/components/shared/Categories";
import {SortPopup} from "@/components/shared/Sort-popup";
import {Filters} from "@/components/shared/Filters";
import React from "react";
import {ProductsGroupList} from "@/components/shared/Products-group-list";
import {Product} from "@/types/product";
import {notFound} from "next/navigation";

interface CategoryPageProps {
  params: {
    category: string;
  };
}

async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  const res = await fetch(`https://64feeebff8b9eeca9e294f18.mockapi.io/Products?categorySlug=${categorySlug}`, {
    next: {revalidate: 60},
  });

  if (!res.ok) {
    throw new Error('Ошибка загрузки продуктов');
  }

  return await res.json();
}


const CategoryPage = async ({params}: CategoryPageProps) => {

  const {category} = params;
  const products = await getProductsByCategory(category);

  if (products.length === 0) {
    notFound();
  }

  return (
    <>
      <Container className="pt-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold mb-3">Все категории</h2>
            <Categories/>
          </div>

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
          <ProductsGroupList products={products}/>

        </div>
      </Container>
    </>
  );
};

export default CategoryPage;