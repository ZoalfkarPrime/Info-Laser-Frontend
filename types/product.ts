export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  orderPrice: number;
  stockPrice: number;
  newPrice: number;
  categorySlug: string;
  categoryName: string;
  imageUrl: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
}