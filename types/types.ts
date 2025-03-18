export interface ClassName {
  className?: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  order: number;
  banner_image_url: string;
  type: string;
  created_at?: string;
  updated_at?: string;
  products: Product[];
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description?: string;
  orderPrice: number;
  stockPrice: number;
  newPrice: number;
  inStock: boolean;
  rating?: number;
  guarantee?: number;
  guaranteeContent?: string;
  created_at?: string;
  updated_at?: string;
  order?: number;
  pivot?: Pivot;
  categories?: CategoryPivot[];
  labels?: Label[];
  product_attachments?: Attachments[];
  onClick?: () => void,
  quantity?: number,
  className?: string
}

export interface Pivot {
  category_id?: number;
  product_id?: number;
}

export interface CategoryPivot {
  id: number;
  name: string;
  slug: string;
  description: string;
  order: number;
  banner_image_url: string;
  type: string;
  created_at?: string;
  updated_at?: string;
  pivot: {
    product_id: number;
    category_id: number;
  };
}

export interface Label {
  id: number;
  name: string;
  slug: string;
  color: string;
  created_at?: string | null;
  updated_at?: string | null;
  pivot: {
    product_id: number;
    label_id: number;
  };
}

export interface Attachments {
  id: number;
  product_id: string;
  name: string;
  external_url: string;
  internal_path: string;
  width: number;
  height: number;
  type: string;
  is_main: boolean;
  order: number;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface CategoriesProps extends ClassName {
  categories: Category[];
  activeCategory?: string;
  title?: string;
}