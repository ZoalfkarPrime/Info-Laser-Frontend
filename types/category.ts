import {ClassName} from "@/types/types";

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface CategoriesProps extends ClassName {
  categories: Category[];
}