import React from 'react';
import {CategoriesProps} from "@/types/category";
import {cn} from '@/lib/utils';
import Link from "next/link";
import Image from "next/image";

export const CategoriesGoods: React.FC<CategoriesProps> = async ({categories, className}) => {

  return (
    <section>
      <h2 className="hidden">Популярные категории</h2>

      <ul className={cn('flex flex-wrap gap-3', className)}>
        {
          categories.map((category) => (
            <li key={category.id}>
              <Link
                href={`/catalog/${category.slug}`}
                className={cn('flex items-center gap-x-3 rounded-2xl max-w-[170px] leading-4 border border-gray-200 overflow-hidden hover:text-[#b82c2c] transition-colors p-3')}
              >
                <Image
                  src={category.imageUrl}
                  alt={category.name}
                  width={40} height={40}
                  className="max-w-[40px]"
                />
                {category.name}
              </Link>
            </li>
          ))
        }
      </ul>
    </section>
  );
};