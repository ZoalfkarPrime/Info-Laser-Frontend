import React from 'react';
import Link from "next/link";
import Image from "next/image";
import {cn} from "@/lib/utils";
import {ptMono} from "@/app/fonts";
import {Product} from "@/types/product";
import {Check, X} from "lucide-react";
import {CallbackBtnProduct} from "@/components/shared/btns/Callback-btn-product";
import {AddToCartButton} from "@/components/shared/btns/Add-to-cart-btn-product";

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
    stockPrice,
    categorySlug,
    categoryName,
    image,
    className,
  }) => {
  return (
    <div
      className={cn('flex flex-col h-full overflow-hidden border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-shadow', className)}>

      <Link
        className="relative flex justify-center bg-gray-400/20 rounded-xl mb-2"
        href={`/catalog/${categorySlug}/${slug}`}
      >
        {String(isHit).toLowerCase() === "true" && (
          <span
            className="flex items-center justify-center absolute top-2 left-2 uppercase py-1 px-3 rounded-2xl bg-red-500 text-white z-20">
            хит
          </span>
        )}
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
        <span className="flex items-center gap-x-1 text-sm text-gray-400 mb-1 leading-none">
          {String(inStock).toLowerCase() === "true" ? <Check className="text-green-400" size={12}/> :
            <X className='text-red-500' size={12}/>}

          {String(inStock).toLowerCase() === "true" ? 'В наличии' : 'Нет в наличии'}
        </span>

        <Link
          className="flex-auto text-[#6941f9] transition-colors hover:text-[#b82c2c] leading-5 mb-3 block"
          href={`/catalog/${categorySlug}/${slug}`}
        >
          <h3 className={ptMono.className}>{name}</h3>
        </Link>

        <ul className="flex items-center justify-between mb-3">
          <li className="leading-4">
            <span className="block text-gray-400 text-sm">Цена без НДС</span>
            <b className="mr-1">{orderPrice}</b>
            <span>₽</span>
          </li>
          <li className="leading-4">
            <span className="block text-gray-400 text-sm">Под заказ без НДС</span>
            <b className="mr-1">{stockPrice}</b>
            <span>₽</span>
          </li>
        </ul>

        <CallbackBtnProduct/>
        
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
          }}/>

        <span className="flex items-center justify-center gap-x-1 text-sm text-center text-gray-400 leading-none">
          <Check className="text-green-400" size={12}/> Гарантия 1 год
        </span>
      </div>
    </div>
  );
};
