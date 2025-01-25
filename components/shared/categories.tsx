'use client'

import {cn} from '@/lib/utils';
import React from 'react';
import Link from "next/link";
import dataCategories from "../../public/data-categories.json";
import {usePathname} from "next/navigation";

interface Props {
  className?: string;
}

const categories = dataCategories.data;

export const Categories: React.FC<Props> = ({className}) => {
  const pathname = usePathname()

  return (
    <ul className={cn('inline-flex gap-1 bg-gray-50 p-2 rounded-2xl', className)}>
      {
        categories.map((category, index) => (
          <li key={index}>

            <Link
              href={`/catalog/${category.slug}`}
              className={cn(
                'flex items-center font-medium h-10 rounded-2xl px-5 hover:text-[#b82c2c] transition-colors border border-gray-300',
                pathname === `/catalog/${category.slug}` && 'bg-white shadow-md shadow-gray-200 text-[#b82c2c]'
              )}
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
