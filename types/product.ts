export interface ProductImage {
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface Product {
  id: number,
  name: string,
  slug: string,
  description: string,
  orderPrice: number,
  stockPrice: number,
  newPrice: number,
  inStock: boolean,
  isHit: boolean,
  isSale?: boolean,
  categorySlug: string,
  categoryName: string,
  images?: ProductImage[],
  image?: ProductImage,
  className?: string,
  quantity?: number,
  onClick?: () => void
}

export interface ProductsGroupListProps {
  products: Product[];
  className?: string;
}