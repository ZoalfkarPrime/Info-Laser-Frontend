import {Container} from "@/components/shared/Container";
import {Filters} from "@/components/shared/filters/Filters";
import {ProductsGroupList} from "@/components/shared/products/ProductsGroupList";
import {getProducts} from "@/api/api";
import {CategoriesGoods} from "@/components/shared/categories/CategoriesGoods";
import {Sorting} from "@/components/shared/Sorting";
import Image from "next/image";
import {cn} from "@/lib/utils";
import {BannerCategory} from "@/components/shared/carousels/banners/BannerCategory";
import {sortProducts} from "@/lib/sorting";
import React from "react";

interface CategoryProps {
  params: Promise<{ category: string }>;
  searchParams: Promise<{
    order_column?: string;
    order_dir?: "asc" | "desc";
    "filter[label_id]"?: string
  }>;
}

const CategoryPage: React.FC<CategoryProps> = async ({params, searchParams}) => {
  const allProducts = await getProducts();
  const {category} = await params;

  const uniqueCategories = Array.from(
    new Map(
      allProducts.flatMap((product) =>
        product.categories.map((cat) => [cat.id, cat])
      )
    ).values()
  );

  const currentCategory = uniqueCategories.find((cat) => cat.slug === category);

  let filteredProducts = currentCategory?.id
    ? allProducts.filter((product) =>
      product.category_ids.includes(currentCategory.id!)
    )
    : [];

  const {order_column, order_dir, "filter[label_id]": filterLabelId} = await searchParams;

  // Применяем фильтрацию (если filter[label_id]==="2" – отбираем акционные товары)
  filteredProducts = sortProducts(filteredProducts, order_column, order_dir, filterLabelId);

  return (
    <>
      <section className={cn("bg-[url('/img/category/bg.jpg')] bg-no-repeat bg-cover py-3 mb-3")}>
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
          <CategoriesGoods className="py-5" categories={uniqueCategories} activeCategory={currentCategory?.slug}/>

          <Sorting
            className={"py-3 mb-5"}
            currentSort={{
              order_column: order_column || "",
              order_dir: order_dir || "",
            }}
          />

          <div className="flex gap-x-5">
            <aside className={"flex-0 min-w-[280px]"}>
              <Filters className={"mb-3"}/>
              <BannerCategory/>
            </aside>

            <div className="flex-1">
              <ProductsGroupList className="mb-3" products={filteredProducts}/>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default CategoryPage;
