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
  categorySlug: string,
  categoryName: string,
  images?: ProductImage[],
  image?: ProductImage
}

export interface ProductsGroupListProps {
  products: Product[];
}

export interface ProductPageProps {
  params: Promise<{ product: string }>;
}
