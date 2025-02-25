import {Category} from "@/types/category";
import {Product} from "@/types/product";

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`https://64feeebff8b9eeca9e294f18.mockapi.io/Categories`, {
    next: {revalidate: 60},
  });

  if (!res.ok) {
    throw new Error('Ошибка загрузки категорий');
  }

  return res.json();
}

export async function getProducts(): Promise<Product[]> {
  const categories = await getCategories();
  return categories.flatMap((category) => category.products || []);
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find((product) => product.slug === slug);
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((product) => product.categorySlug === categorySlug);
}
