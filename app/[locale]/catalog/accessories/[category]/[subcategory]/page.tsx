import {Container} from "@/components/shared/Container";
import {Filters, CharacteristicFilter} from "@/components/shared/filters/Filters";
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
import {getTranslations} from "next-intl/server";

interface SubcategoryPageProps {
  params: Promise<{ category: string; subcategory: string }>;
  searchParams: Promise<{
    page?: string;
    order_column?: string;
    order_dir?: "asc" | "desc";
    "filter[label_id]"?: string;
    priceFrom?: string;
    priceTo?: string;
    materials?: string;
    manufacturer?: string;
    [key: string]: string | undefined;
  }>;
}

export async function generateMetadata({params: paramsPromise}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const {locale, category} = await paramsPromise;
  const t = await getTranslations({locale});
  const allProducts = await getProducts();

  const uniqueCategories = Array.from(
    new Map(
      allProducts.products.flatMap((product) =>
        product.categories.map((cat) => [cat.id, cat])
      )
    ).values()
  );

  const currentCategory = uniqueCategories.find(cat => cat.slug === category);

  return {
    title: currentCategory?.name
      ? `${currentCategory.name} ${t('addName')}`
      : t("catalogMetaTitle"),
    description: currentCategory?.description || "",
  };
}

const SubcategoryPage = async ({params, searchParams}: SubcategoryPageProps) => {
  const allProducts = await getProducts();
  const {category} = await params;

  const t = await getTranslations();
  const sp = await searchParams;
  const order_column = sp.order_column || "";
  const order_dir = sp.order_dir === "asc" || sp.order_dir === "desc" ? sp.order_dir : undefined;
  const filterLabelId = sp["filter[label_id]"] || "";
  const page = parseInt(sp.page || "1", 10);
  const itemsPerPage = 9;

  const currentParams = {
    ...sp,
    page: undefined,
  };
  const queryString = qs.stringify(currentParams, {encode: false});

  const uniqueCategories = Array.from(
    new Map(
      allProducts.products.flatMap((product) =>
        product.categories.map((cat) => [cat.id, cat])
      )
    ).values()
  );

  const currentCategory = uniqueCategories.find((cat) => cat.slug === category);

  let filteredProducts = currentCategory?.id
    ? allProducts.products.filter((product) =>
      product.category_ids.includes(currentCategory.id!)
    )
    : [];

  let minPrice = 0;
  let maxPrice = 150000;
  const materialsList: { name: string; value: string }[] = [];
  const manufacturersList: { name: string; value: string }[] = [];
  let characteristicsList: CharacteristicFilter[] = [];

  if (filteredProducts.length > 0) {
    const prices = filteredProducts.map((p) => p.inStock && p.stockPrice > 0 ? p.stockPrice : p.orderPrice).filter(p => !isNaN(p) && p !== null);
    if (prices.length > 0) {
      minPrice = Math.min(...prices);
      maxPrice = Math.max(...prices);
      if (minPrice === maxPrice) {
        maxPrice += 10;
      }
    }

    const materialsMap = new Map();
    const manufacturersMap = new Map();
    const charsMap = new Map<string, { unit: string | null; values: Map<string, string> }>();

    filteredProducts.forEach((p) => {
      p.materials?.forEach((m) => materialsMap.set(m.slug, { name: m.name, value: m.slug }));
      if (p.laser_suppliers?.slug) {
        manufacturersMap.set(p.laser_suppliers.slug, { name: p.laser_suppliers.name, value: p.laser_suppliers.slug });
      }
      p.productCharacteristics?.forEach((c) => {
        if (!charsMap.has(c.name)) {
          charsMap.set(c.name, { unit: c.unit, values: new Map() });
        }
        const charEntry = charsMap.get(c.name)!;
        const label = c.unit ? `${c.value} ${c.unit}` : c.value;
        if (c.value) {
          charEntry.values.set(c.value, label ?? '');
        }
      });
    });
    materialsMap.forEach((v) => materialsList.push(v));
    manufacturersMap.forEach((v) => manufacturersList.push(v));

    characteristicsList = Array.from(charsMap.entries()).map(([name, data]) => ({
      name,
      unit: data.unit,
      items: Array.from(data.values.entries()).map(([value, label]) => ({
        name: label || value,
        value: value,
      })),
    }));
  }

  const priceFromParam = parseInt(sp.priceFrom || "0", 10);
  const priceToParam = parseInt(sp.priceTo || "999999999", 10);
  const materialsFilter = sp.materials ? sp.materials.split(',') : [];
  const mfgFilter = sp.manufacturer ? sp.manufacturer.split(',') : [];

  const charFilters: Record<string, string[]> = {};
  Object.keys(sp).forEach((key) => {
    if (key.startsWith("char[")) {
      const charName = key.replace("char[", "").replace("]", "");
      charFilters[charName] = sp[key]?.split(",") || [];
    }
  });

  filteredProducts = filteredProducts.filter((product) => {
    let isValid = true;
    const price = product.inStock && product.stockPrice > 0 ? product.stockPrice : product.orderPrice;

    if (sp.priceFrom || sp.priceTo) {
      if (price < priceFromParam || price > priceToParam) {
        isValid = false;
      }
    }

    if (isValid && materialsFilter.length > 0) {
      if (!product.materials?.some((m) => materialsFilter.includes(m.slug))) {
        isValid = false;
      }
    }

    if (isValid && mfgFilter.length > 0) {
      if (!product.laser_suppliers?.slug || !mfgFilter.includes(product.laser_suppliers.slug)) {
        isValid = false;
      }
    }

    if (isValid) {
      for (const [charName, selectedValues] of Object.entries(charFilters)) {
        if (selectedValues.length > 0) {
          if (
            !product.productCharacteristics?.some(
              (c) => c.name === charName && c.value && selectedValues.includes(c.value)
            )
          ) {
            isValid = false;
            break;
          }
        }
      }
    }

    return isValid;
  });

  filteredProducts = sortProducts(filteredProducts, order_column, order_dir, filterLabelId);

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
            <h1 className="text-5xl mb-1">{currentCategory?.name} {t('addName')}</h1>
            <p className={"text-sm"}>{currentCategory?.description} {t('addName')}</p>
          </div>

          {currentCategory?.filemanager?.url ? (
            <Image
              src={currentCategory.filemanager?.url}
              alt={currentCategory.name ?? "Изображение категории"}
              width={400}
              height={250}
              className={"basis-1/2 max-w-[400px] max-md:max-w-full"}
            />
          ) : (
            <div
              className="max-w-[400px] bg-gray-200 text-gray-400 text-xs flex items-center justify-center max-md:max-w-full">
              нет фото
            </div>
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
              <Filters
                className="mb-3"
                materials={materialsList}
                manufacturers={manufacturersList}
                characteristics={characteristicsList}
                minPrice={Math.max(0, minPrice)}
                maxPrice={maxPrice}
              />
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

export default SubcategoryPage;
