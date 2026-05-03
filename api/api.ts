import { Article as ArticleList, ArticleListVM, Category, Pagination, Product } from "@/types/types";
import Partner, { PartnerVM } from "@/types/partner";
import { Article } from "@/types/article";
import { API_BASE_URL } from "./client";

const GET_CATALOG_DATA = `https://api.infolasers.ru/api/catalog`;
const GET_CATEGORIES = `https://api.infolasers.ru/api/category/getall`;
const GET_PRODUCTS = `https://api.infolasers.ru/api/product/getall`;

// Api получения массива категорий с продуктами, и аксессуаров. (Используется в header > Каталог)
export async function getCatalogData(): Promise<{ product: Category[]; accessory: Category[]; }> {
  const res = await fetch(GET_CATALOG_DATA, { next: { revalidate: 60 } });

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
  const res = await fetch(GET_CATEGORIES, { next: { revalidate: 60 } });

  if (!res.ok) {
    throw new Error("Ошибка загрузки категорий");
  }

  const json = await res.json();
  return json.data.categories.data;
}

// Api получения массива продуктов с вложенными категориями
export async function getProducts(): Promise<{ products: Product[]; pagination: Pagination }> {
  const res = await fetch(GET_PRODUCTS, { next: { revalidate: 60 } });

  if (!res.ok) {
    throw new Error("Ошибка загрузки продуктов");
  }

  const json = await res.json();
  return {
    products: json.data.list ?? [],
    pagination: json.data.pagination ?? [],
  }
}

// Получение одного продукта по slug
export async function getOneProductBySlug(slug: string): Promise<Product | undefined> {
  const products = await getProducts();
  return products.products.find((product) => product.slug === slug);
}

// Api получения массива статей с вложенными категориями
export async function getArticles(): Promise<{ articles: ArticleList[] }> {
  const res = await fetch(`${API_BASE_URL}/api/KnowledgeArticles`, { next: { revalidate: 60 } });

  if (!res.ok) {
    throw new Error("Ошибка загрузки списка статей");
  }

  const json = await res.json();
  const articles: ArticleList[] = (json.data.list || []).map((item: ArticleListVM) => ({
    id: item.id,
    name: item.title,
    slug: item.slug,
    description: "", // API list doesn't seem to have description
    isMain: item.is_active === 1,
    date: item.published_at,
    image: item.image || "/img/articles/articles-main/1.jpg", // Fallback image
    articleCategory: [
      {
        id: item.category_id,
        name: item.category.name,
        slug: item.category.slug,
      },
    ],
  }));

  return { articles };
}

// Получение одной статьи по slug
export async function getOneArticleBySlug(slug: string): Promise<ArticleList | undefined> {
  const { articles } = await getArticles();
  return articles.find(article => article.slug === slug);
}

// Получение деталей статьи по slug
export async function getArticleDetails(slug: string): Promise<Article> {
  const res = await fetch(`${API_BASE_URL}/api/KnowledgeArticles/${slug}`, { next: { revalidate: 60 } });

  if (!res.ok) {
    throw new Error("Ошибка загрузки статьи");
  }

  const json = await res.json();
  return Article.fromJson(json);
}
// Api получения массива партнеров
export async function getPartners(): Promise<Partner[]> {
  const res = await fetch(`${API_BASE_URL}/api/laser-supplier`, { next: { revalidate: 60 } });

  if (!res.ok) {
    throw new Error("Ошибка загрузки списка партнеров");
  }

  const json = await res.json();
  return (json.data.list || []).map((item: PartnerVM) => new PartnerVM(item).toPartner()).filter((partner: Partner) => partner.filemanager && partner.filemanager?.url !== "");
}
