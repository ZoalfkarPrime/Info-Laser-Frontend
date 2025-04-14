import React from 'react';
import Link from "next/link";
import Image from "next/image";
import {cn} from "@/lib/utils";
import {Product} from "@/types/types";

interface ProductCardHeaderProps extends Product {
  currentCategorySlug: string;
}

export const ProductCardHeader: React.FC<ProductCardHeaderProps> = (
  {
    name,
    slug,
    categories,
    className,
    product_attachments,
    currentCategorySlug,
    onClick
  }) => {

  const mainImage = product_attachments?.find((item) => item.is_main);
  const activeCategory = categories?.find(cat => cat.slug === currentCategorySlug);
  const categorySlug = activeCategory?.slug || categories?.[0]?.slug || '';

  return (
    <Link
      className={cn(
        "relative flex items-center gap-3 overflow-hidden bg-[var(--gray)] rounded-3xl p-3 text-sm leading-5 transition-colors duration-300",
        "hover:text-[var(--violet)] focus:text-[var(--violet)]",
        "hover:[&>div>img]:scale-110 focus:[&>div>img]:scale-110",
        className
      )}
      href={`/catalog/${categorySlug}/${slug}`}
      onClick={onClick}
    >
      <div className="flex justify-center items-center shrink-0 overflow-hidden h-[80px] w-[80px] rounded-md bg-white">
        {mainImage ? (
          <Image
            className="transition-transform"
            src={mainImage.external_url}
            alt={mainImage.name}
            width={mainImage.width}
            height={mainImage.height}
          />
        ) : (
          <div className="w-[80px] h-[80px] bg-gray-200 text-gray-400 text-xs flex items-center justify-center">
            нет фото
          </div>
        )}
      </div>

      {name}
    </Link>
  );
};
