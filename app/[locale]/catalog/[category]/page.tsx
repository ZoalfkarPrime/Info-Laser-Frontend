import {Container} from "@/components/shared/Container";
import {Filters} from "@/components/shared/filters/Filters";
import {ProductsGroupList} from "@/components/shared/products/ProductsGroupList";
import {getProducts} from "@/api/api";
import {CategoriesGoods} from "@/components/shared/categories/CategoriesGoods";
import {Sorting} from "@/components/shared/sorting/Sorting";
import Image from "next/image";
import {cn} from "@/lib/utils";
import {BannerCategory} from "@/components/shared/carousels/banners/BannerCategory";
import {sortProducts} from "@/lib/sorting";
import React from "react";
import {PaginationControls} from "@/components/shared/products/PaginationControls";
import qs from "qs";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
  searchParams: Promise<{
    page?: string;
    order_column?: string;
    order_dir?: "asc" | "desc";
    "filter[label_id]"?: string;
  }>;
}

const CategoryPage = async ({params, searchParams}: CategoryPageProps) => {
  const allProducts = await getProducts();
  const {category} = await params;

  // Ожидаем searchParams и сохраняем его в переменную
  const sp = await searchParams;
  const order_column = sp.order_column || "";
  const order_dir = sp.order_dir === "asc" || sp.order_dir === "desc" ? sp.order_dir : undefined;
  const filterLabelId = sp["filter[label_id]"] || "";
  const page = parseInt(sp.page || "1", 10);
  const itemsPerPage = 9;

  const currentParams = {
    ...sp,
    page: undefined, // убираем страницу, чтобы подставить новую
  };
  const queryString = qs.stringify(currentParams, {encode: false});

  // Список всех уникальных категорий
  const uniqueCategories = Array.from(
    new Map(
      allProducts.products.flatMap((product) =>
        product.categories.map((cat) => [cat.id, cat])
      )
    ).values()
  );

  // Текущая категория
  const currentCategory = uniqueCategories.find((cat) => cat.slug === category);

  // Фильтрация продуктов по текущей категории
  let filteredProducts = currentCategory?.id
    ? allProducts.products.filter((product) =>
      product.category_ids.includes(currentCategory.id!)
    )
    : [];

  // Сортировка и фильтрация по ярлыку
  filteredProducts = sortProducts(filteredProducts, order_column, order_dir, filterLabelId);

  // Пагинация
  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <>
      <section
        className={cn(
          "bg-[url('/img/category/bg.jpg')] bg-no-repeat bg-cover py-3 mb-3"
        )}
      >
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
            categories={uniqueCategories}
            activeCategory={currentCategory?.slug}
          />

          <Sorting
            className="py-3 mb-5"
            currentSort={{
              order_column,
              order_dir,
            }}
          />

          <div className="flex gap-x-5">
            <aside className="flex-0 min-w-[280px]">
              <Filters className="mb-3"/>
              <BannerCategory/>
            </aside>

            <div className="flex-1">
              <ProductsGroupList className="mb-3" products={paginatedProducts}/>

              <PaginationControls
                currentPage={page}
                totalPages={totalPages}
                basePath={`/catalog/${category}`}
                query={queryString}
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default CategoryPage;
