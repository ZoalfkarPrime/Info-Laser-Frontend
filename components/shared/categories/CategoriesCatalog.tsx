import {cn} from '@/lib/utils';
import React from 'react';
import Link from "next/link";
import {CategoriesProps} from "@/types/types";
import {Container} from "@/components/shared/Container";
import Image from "next/image";

export const CategoriesCatalog: React.FC<CategoriesProps> = async ({categories, className, title}) => {

  return (

    <section className={"py-3"}>
      <Container>
        <h2 className="text-3xl font-semibold mb-5">{title}</h2>

        <ul className={cn('grid grid-cols-4 gap-5', className)}>
          {
            categories.map((category, index) => (
              <li
                key={category.id}
                className={cn(index === 0 ? 'col-span-2' : '')}
              >
                <Link
                  href={`/catalog/${category.slug}`}
                  className={cn('flex flex-col font-medium rounded-3xl text-xl bg-gray-200 overflow-hidden hover:text-[var(--red)] transition-colors p-5')}
                >
                  <Image
                    src={category.banner_image_url}
                    alt={category.name}
                    width={220} height={170}
                    className="flex self-center mr-2 mb-1"
                  />
                  {category.name}
                </Link>
              </li>
            ))
          }
        </ul>

      </Container>
    </section>
  );
};
