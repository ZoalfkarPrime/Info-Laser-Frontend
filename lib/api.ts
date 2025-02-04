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

export async function getAllProducts(): Promise<Product[]> {
  const res = await fetch(`https://64feeebff8b9eeca9e294f18.mockapi.io/Products`, {
    next: {revalidate: 60},
  });

  if (!res.ok) {
    throw new Error('Ошибка загрузки продуктов');
  }

  return await res.json();
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  const res = await fetch(`https://64feeebff8b9eeca9e294f18.mockapi.io/Products?categorySlug=${categorySlug}`, {
    next: {revalidate: 60},
  });

  if (!res.ok) {
    throw new Error('Ошибка загрузки продуктов');
  }

  return await res.json();
}

export async function getProductsBySlug(slug: string): Promise<Product[]> {
  const res = await fetch(`https://64feeebff8b9eeca9e294f18.mockapi.io/Products?slug=${slug}`, {
    next: {revalidate: 60},
  });

  if (!res.ok) {
    throw new Error('Ошибка загрузки продуктов');
  }

  return await res.json();
}

