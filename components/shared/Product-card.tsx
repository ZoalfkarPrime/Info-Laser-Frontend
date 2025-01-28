import React from 'react';
import Link from "next/link";
import Image from "next/image";
import {Button} from "@/components/ui/Button";
import {Plus} from "lucide-react";
import {cn} from "@/lib/utils";
import {ptMono} from "@/app/fonts";
import {Product} from "@/types/product";

export const ProductCard: React.FC<Product> = (
  {
    name,
    slug,
    orderPrice,
    stockPrice,
    categorySlug,
    categoryName,
    imageUrl,
    imageAlt,
    imageWidth,
    imageHeight,
  }) => {
  return (
    <li
      className={cn('flex flex-col border border-gray-200 p-8 rounded-xl shadow-md  hover:shadow-xl transition-shadow')}>

      <Link className="block mb-2" href={`/catalog/${categorySlug}/${slug}`}>
        <Image className="hover:scale-110 transition-transform" src={imageUrl} alt={imageAlt} width={imageWidth}
               height={imageHeight}/>
      </Link>

      <p className="text-sm text-gray-400 mb-1 leading-none">{categoryName}</p>

      <Link className="text-[#6941f9] transition-colors hover:text-[#b82c2c] leading-5 mb-3 block"
            href={`/catalog/${categorySlug}/${slug}}`}>
        <h3 className={ptMono.className}>{name}</h3>
      </Link>

      <ul className="flex items-center justify-between mb-3 mt-auto">
        <li className="leading-4">
          <b className="mr-1">{orderPrice}</b>
          <span>₽</span><br/>
          <span className="text-gray-400 text-sm">Со склада</span>
        </li>
        <li className="leading-4">
          <b className="mr-1">{stockPrice}</b>
          <span>₽</span><br/>
          <span className="text-gray-400 text-sm">Под заказ</span>
        </li>
      </ul>


      <div className="flex flex-col items-center gap-2">
        <Button className="w-full">Обратный звонок</Button>
        <Button className="w-full">
          <Plus size={16}/>
          В корзину
        </Button>
        <Link
          className="text-[16px] text-center text-[#6941f9] border-b border-gray-300 hover:text-[#b82c2c] transition-colors"
          href={`/catalog/${categorySlug}/${slug}`}>Подробнее</Link>
      </div>
    </li>
  )
};
