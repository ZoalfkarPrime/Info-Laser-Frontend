import React from 'react';
import {CategoriesProps} from "@/types/types";
import {cn} from '@/lib/utils';
import Link from "next/link";
import Image from "next/image";

export const CategoriesGoods: React.FC<CategoriesProps> = async ({categories, className, activeCategory}) => {
  return (
    <section>
      <h2 className="hidden">Популярные категории</h2>

      <ul className={cn('flex flex-wrap gap-3', className)}>
        {categories.map((category) => {
          const isActive = activeCategory === category.slug;
          
          return (
            <li key={category.id}>
              {isActive ? (
                <div
                  className={cn(
                    "flex items-center text-sm bg-[var(--gray)] rounded-2xl max-w-[200px] leading-4 overflow-hidden py-1 px-3",
                    "text-[var(--violet)]",
                    "border-1 !border-[var(--violet)]"
                  )}
                >
                  <Image
                    src={category.banner_image_url}
                    alt={category.name}
                    width={80} height={80}
                    className="max-w-[80px] mr-1"
                  />
                  {category.name}
                </div>
              ) : (
                <Link
                  href={`/catalog/${category.slug}`}
                  className={cn(
                    "flex items-center text-sm bg-[var(--gray)] rounded-2xl max-w-[200px] leading-4 border-1 !border-gray-100 transition-colors",
                    "overflow-hidden transition-colors py-1 px-3",
                    "hover:text-[var(--violet)]",
                  )}
                >
                  <Image
                    src={category.banner_image_url}
                    alt={category.name}
                    width={80} height={80}
                    className="max-w-[80px] mr-3"
                  />
                  {category.name}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
};