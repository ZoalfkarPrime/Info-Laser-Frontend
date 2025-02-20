import {ClassName} from "@/types/types";
import {Product} from "@/types/product";

export interface Category {
  id: string;
  name: string;
  description: string;
  slug: string;
  imageUrl: string;
  products: Product[];
}

export interface CategoriesProps extends ClassName {
  categories: Category[];
}

export interface CategoryPageProps {
  params: Promise<{ category: string }>;
}
