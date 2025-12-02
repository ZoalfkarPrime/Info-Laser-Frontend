import React from "react";
import {cn, formatPrice} from "@/lib/utils";
import {ClassName, Product} from "@/types/types";
import Link from "next/link";
import Image from "next/image";

interface NecessaryProductsListProps extends ClassName {
  categorySlug?: string;
  currentProductSlug?: string;
  products: Product[];
}

const getMainImageUrl = (product: Product): string => {
  const mainImage = product.product_attachments?.find((attachment) => {
    if (!attachment) {
      return false;
    }

    return Boolean(attachment.is_main) && attachment.type === "image";
  });

  if (mainImage?.filemanager?.url) {
    return mainImage.filemanager.url;
  }

  return "";
};

const getDisplayPrice = (product: Product): number => product.stockPrice ?? 0;

export const NecessaryProductsList: React.FC<NecessaryProductsListProps> = (
  {className, categorySlug, currentProductSlug, products}
) => {
  if (!categorySlug || !products || products.length === 0) {
    return null;
  }

  const relatedProducts = products
    .filter((product) => {
      if (product.slug === currentProductSlug) {
        return false;
      }

      if (!product.categories || product.categories.length === 0) {
        return false;
      }

      return product.categories.some((category) => category.slug === categorySlug);
    })
    .slice(0, 3);

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <div className={cn("", className)}>
      <p className={cn(
        "font-semibold mb-3",
        "max-md:text-sm"
      )}>
        Вам может понадобиться
        <span className={"text-[var(--gray-text)] text-sm ml-2"}>{relatedProducts.length}</span>
      </p>
      <ul className={"space-y-2"}>
        {relatedProducts.map((product) => {
          const imageUrl = getMainImageUrl(product);
          const price = getDisplayPrice(product);

          return (
            <li
              className={cn("border border-[var(--gray)] rounded-3xl p-3 flex justify-between items-center")}
              key={product.id}
            >
              <Link
                className={cn(
                  "flex items-center gap-3 text-sm transition-colors duration-300",
                  "hover:text-[var(--violet)] focus:text-[var(--violet)]",
                  "max-md:text-xs max-md:gap-2"
                )}
                href={`/catalog/${categorySlug}/${product.slug}`}
              >
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    width={42}
                    height={42}
                    alt={product.name}
                  />
                ) : (
                  <div
                    className="w-[42px] h-[42px] text-center flex items-center justify-center bg-gray-200 text-gray-400 text-xs rounded-xl"
                  >
                    нет фото
                  </div>
                )}

                {product.name}
              </Link>

              <div className={"flex items-center gap-3"}>
                <b>{formatPrice(price)} ₽</b>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

