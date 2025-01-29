import {cn} from '@/lib/utils';
import React from 'react';
import Link from "next/link";
import {CategoriesProps} from "@/types/category";

export const Categories: React.FC<CategoriesProps> = async ({categories, className}) => {

  return (
    <ul className={cn('inline-flex gap-1 bg-gray-50 p-2 rounded-2xl', className)}>
      {
        categories.map((category) => (
          <li key={category.id}>

            <Link
              href={`/catalog/${category.slug}`}
              className={cn('flex items-center font-medium h-10 rounded-2xl px-5 hover:text-[#b82c2c] transition-colors border border-gray-300')}
            >
              <button className="hover:cursor-pointer">
                <h3>
                  {category.name}
                </h3>
              </button>
            </Link>
          </li>
        ))
      }
    </ul>
  );
};
