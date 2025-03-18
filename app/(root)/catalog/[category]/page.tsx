import React from "react";
import {Container} from "@/components/shared/Container";
import {SortPopup} from "@/components/shared/Sort-popup";
import {Filters} from "@/components/shared/filters/Filters";
import {ProductsGroupList} from "@/components/shared/products/Products-group-list";
import {getCategories} from "@/api/api";
import {CategoriesGoods} from "@/components/shared/categories/Categories-goods";

interface CategoryProps {
  params: Promise<{ product: string; category: string }>;
}

const CategoryPage: React.FC<CategoryProps> = async ({params}) => {
  const categories = await getCategories();
  const {category} = await params;
  const currentCategory = categories.find((cat) => cat.slug === category);

  return (
    <Container>
      <section className="py-3 mb-3">
        <h1 className="text-3xl mb-1">{currentCategory?.name}</h1>
        <p>{currentCategory?.description}</p>
      </section>

      <section className="flex gap-x-5">
        <h2 className="hidden">{currentCategory?.name}</h2>
        <aside>
          <Filters/>
        </aside>

        <div className="flex-1">
          <CategoriesGoods className="mb-3" categories={categories} activeCategory={currentCategory?.slug}/>
          <SortPopup/>
          <ProductsGroupList className="mb-3" products={currentCategory?.products || []}/>

        </div>
      </section>
    </Container>
  );
};

export default CategoryPage;