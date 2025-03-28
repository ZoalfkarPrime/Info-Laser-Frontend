import React from "react";
import {Container} from "@/components/shared/Container";
import {Filters} from "@/components/shared/filters/Filters";
import {ProductsGroupList} from "@/components/shared/products/ProductsGroupList";
import {getCategories} from "@/api/api";
import {CategoriesGoods} from "@/components/shared/categories/CategoriesGoods";
import {Sorting} from "@/components/shared/Sorting";
import {SortingProvider} from "@/context/SortingContext";
import Image from "next/image";
import {cn} from "@/lib/utils";
import {BannerCategory} from "@/components/shared/carousels/banners/BannerCategory";

interface CategoryProps {
  params: Promise<{ product: string; category: string }>;
}

const CategoryPage: React.FC<CategoryProps> = async ({params}) => {
  const categories = await getCategories();
  const {category} = await params;
  const currentCategory = categories.find((cat) => cat.slug === category);

  return (
    <SortingProvider>
      <section className={cn(
        "bg-[url('/img/category/bg.jpg')] bg-no-repeat bg-cover py-3 mb-3",
      )}>
        <Container className={"flex justify-between items-center"}>
          <div>
            <h1 className="text-5xl mb-1">{currentCategory?.name}</h1>
            <p className={"text-sm"}>{currentCategory?.description}</p>
          </div>

          {currentCategory?.banner_image_url && (
            <Image
              src={currentCategory.banner_image_url}
              alt={currentCategory.name ?? "Изображение категории"}
              width={400}
              height={250}
            />
          )}
        </Container>
      </section>

      <section>
        <Container>
          <CategoriesGoods
            className="py-5"
            categories={categories}
            activeCategory={currentCategory?.slug}
          />

          <Sorting className={"justify-end border-b border-b-gray-200 py-3"}/>

          <div className="flex gap-x-5">
            <aside className={"flex-0 min-w-[280px]"}>
              <Filters className={"mb-3"}/>
              <BannerCategory/>
            </aside>

            <div className="flex-1">
              <ProductsGroupList className="mb-3" products={currentCategory?.products || []}/>
            </div>
          </div>

        </Container>
      </section>
    </SortingProvider>
  );
};

export default CategoryPage;