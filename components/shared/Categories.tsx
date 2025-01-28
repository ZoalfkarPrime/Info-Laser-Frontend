import {cn} from '@/lib/utils';
import React from 'react';
import Link from "next/link";
import {ClassName} from "@/types/types";
import {Category} from "@/types/category";


async function getCategories(): Promise<Category[]> {
  const res = await fetch(`https://64feeebff8b9eeca9e294f18.mockapi.io/Categories`, {
    next: {revalidate: 60},
  });

  if (!res.ok) {
    throw new Error('Ошибка загрузки категорий');
  }

  return res.json();
}

export const Categories: React.FC<ClassName> = async ({className}) => {

  const categories = await getCategories();

  return (
    <ul className={cn('inline-flex gap-1 bg-gray-50 p-2 rounded-2xl', className)}>
      {
        categories.map((category, index) => (
          <li key={index}>

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
