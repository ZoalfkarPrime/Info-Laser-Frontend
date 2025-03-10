import React from 'react';
import Link from "next/link";
import Image from "next/image";
import {cn} from "@/lib/utils";
import {Product} from "@/types/product";
import {Check, Clock3, Star} from "lucide-react";
import {AddToCartButton} from "@/components/shared/btns/Add-to-cart-btn-product";
import {Button} from "@/components/ui/Button";

export const ProductCard: React.FC<Product> = (
  {
    id,
    description,
    newPrice,
    name,
    slug,
    orderPrice,
    inStock,
    isHit,
    isSale,
    stockPrice,
    categorySlug,
    categoryName,
    image,
    className,
    onClick,
  }) => {

  const formatPrice = (price: number) => price.toLocaleString("ru-RU").replace(/\s/g, ".");

  return (
    <div
      className={cn('relative flex flex-col h-full overflow-hidden bg-[#F8F9FD] border border-gray-200 rounded-3xl p-2', className)}>

      {(String(isHit).toLowerCase() === "true" || String(isSale).toLowerCase() === "true") && (
        <p
          className={cn(
            "absolute block w-[73px] h-[73px] text-[15px] top-[-28px] left-[-28px] rounded-full text-white uppercase z-20",
            String(isHit).toLowerCase() === "true" ? "bg-[#00A94C] -rotate-45" : "bg-[#CF26E9] rotate-0"
          )}
        >
          <span
            className={cn(
              "absolute ",
              String(isHit).toLowerCase() === "true" ? "right-[21px] bottom-[6px]" : "right-[16px] bottom-[11px] font-semibold"
            )}
          >
      {String(isHit).toLowerCase() === "true" ? "new" : "%"}
          </span>
        </p>
      )}

      <Link
        className="flex justify-center mb-2 overflow-hidden min-h-[220px]"
        href={`/catalog/${categorySlug}/${slug}`}
        onClick={onClick}
      >
        {image && (
          <Image
            className="hover:scale-110 transition-transform z-10"
            src={image.url}
            alt={image.alt}
            width={image.width}
            height={image.height}
          />
        )}
      </Link>

      <div className="flex flex-col h-full p-3">
        {String(inStock).toLowerCase() === "true" ?
          (
            <span
              className="inline-flex items-center gap-x-1 place-self-start text-sm text-[#4F26E9] bg-[#3E1EB5]/10 rounded-2xl px-2 py-2 mb-3 leading-none">
            <Check className="text-[#4F26E9]" size={12}/>
            В наличии
        </span>
          ) :
          (
            <span
              className="inline-flex items-center gap-x-1 place-self-start text-sm text-[#00A94C] bg-[#00A94C]/10 rounded-2xl px-2 py-2 mb-3 leading-none">
            <Clock3 className='text-[#00A94C]' size={12}/>
            Под заказ
          </span>
          )
        }

        <Link
          className="flex-auto hover:text-[#6941f9] focus:text-[#6941f9] text-[18px] font-semibold transition-colors leading-5 mb-3 block"
          href={`/catalog/${categorySlug}/${slug}`}
          onClick={onClick}
        >
          <h3>{name}</h3>
        </Link>

        <dl className="flex justify-between mb-3">
          {String(inStock).toLowerCase() === "true" && (
            <div>
              <dt>Цена без НДС</dt>
              <dd>
                <b className="text-[18px] font-normal">
                  {formatPrice(stockPrice)}
                  <span className="ml-1">₽</span>
                </b>
              </dd>
            </div>
          )}

          <div>
            <dt>Под заказ без НДС</dt>
            <dd>
              <b className="text-[18px] font-normal">
                {formatPrice(orderPrice)}
                <span className="ml-1">₽</span>
              </b>
            </dd>
            {String(isSale).toLowerCase() === "true" && (
              <>
                <dt className="hidden">Акционная цена</dt>
                <dd className="inline-block bg-black/7 px-2 py-1 rounded-3xl">
                  <b className="text-[15px] font-normal line-through">
                    {formatPrice(newPrice)}
                    <span className="ml-1">₽</span>
                  </b>
                </dd>
              </>
            )}
          </div>
        </dl>

        <div className={"flex items-center justify-between gap-3 mb-3"}>
          <Button asChild className='flex-1 rounded-3xl py-5'>
            <Link href={`/catalog/${categorySlug}/${slug}`}>Узнать больше</Link>
          </Button>

          <AddToCartButton
            product={{
              id,
              name,
              slug,
              description,
              newPrice,
              orderPrice,
              stockPrice,
              inStock,
              isHit,
              categorySlug,
              categoryName,
              image
            }}
          />
        </div>

        <div className={"flex items-center gap-x-5"}>
          <span className="flex items-center justify-center gap-x-1 text-sm text-center leading-none">
            <Star fill="#E99826" strokeWidth={0} size={12}/>
            4.9
          </span>
          <span className="flex items-center justify-center gap-x-1 text-sm text-center leading-none">
          <Check className="text-[#6941f9]" size={12}/>
          Обязательная гарантия 1 год
        </span>
        </div>
      </div>
    </div>
  );
};
