import {Category, Product} from "@/types/types";

const GET_HEADER_CATALOG_DATA = `https://api.infolasers.ru/api/catalog`;
const GET_CATALOG_CATEGORIES = `https://api.infolasers.ru/api/category/getall`;
const GET_ALL_PRODUCTS = `https://api.infolasers.ru/api/product/getall`;

// Api получения массива категорий с продуктами, и аксессуаров. (Используется в header > Каталог)
export async function getCatalogData(): Promise<{ product: Category[]; accessory: Category[]; }> {
  const res = await fetch(GET_HEADER_CATALOG_DATA, {next: {revalidate: 60}});

  if (!res.ok) {
    throw new Error("Ошибка загрузки данных");
  }

  const json = await res.json();

  return {
    product: json.data.categories.product ?? [],
    accessory: json.data.categories.accessory ?? [],
  };
}

// Api получения массива категорий с вложенными продуктами
export async function getCategories(): Promise<Category[]> {
  const res = await fetch(GET_CATALOG_CATEGORIES, {next: {revalidate: 60}});

  if (!res.ok) {
    throw new Error("Ошибка загрузки категорий");
  }

  const json = await res.json();
  return json.data.categories.data;
}

// Api получения массива продуктов с вложенными категориями
export async function getProducts(): Promise<Product[]> {
  const res = await fetch(GET_ALL_PRODUCTS, {next: {revalidate: 60}});

  if (!res.ok) {
    throw new Error("Ошибка загрузки продуктов");
  }

  const json = await res.json();
  return json.data.list;
}

// Api получения одного продукта по slug
export async function getOneProductBySlug(slug: string): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find((product) => product.slug === slug);
}
