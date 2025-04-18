import {cn} from '@/lib/utils';
import React from 'react';
import Link from "next/link";
import {CategoriesProps} from "@/types/types";
import {Container} from "@/components/shared/Container";
import Image from "next/image";

export const CategoriesCatalog: React.FC<CategoriesProps> = async ({categories, className, title}) => {
  return (
    <section className="py-3">
      <Container>
        <h2 className="text-3xl font-semibold mb-5">{title}</h2>

        <ul className={cn('grid grid-cols-4 gap-5', className)}>
          {categories.map((category, index) => (
            <li
              key={category.id}
              className={cn(index === 0 ? 'col-span-2' : '')}
            >
              <Link
                href={`/catalog/${category.slug}`}
                className={cn(
                  "flex flex-col font-medium rounded-3xl text-xl bg-[var(--gray)] overflow-hidden transition-colors p-5",
                  "hover:text-[var(--violet)] focus:text-[var(--violet)]"
                )}
              >
                <div
                  className="flex justify-center items-center shrink-0 overflow-hidden h-[170px] w-full rounded-md mb-2">
                  {category.banner_image_url ? (
                    <Image
                      className="transition-transform object-contain"
                      src={category.banner_image_url}
                      alt={category.name}
                      width={220}
                      height={170}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 text-gray-400 text-sm flex items-center justify-center">
                      нет фото
                    </div>
                  )}
                </div>

                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};
