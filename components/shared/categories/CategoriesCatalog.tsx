import {cn} from '@/lib/utils';
import React from 'react';
import Link from "next/link";
import {Container} from "@/components/shared/Container";
import Image from "next/image";
import {Category} from "@/types/types";
import {Button} from "@/components/ui/Button";
import {AccessoriesSimpleList} from "@/components/shared/accessories/AccessoriesSimpleList";

interface Props {
  title: string;
  productCategories: Category[];
  accessoryCategories: Category[];
  className?: string;
}

export const CategoriesCatalog: React.FC<Props> = async (
  {
    title,
    productCategories,
    accessoryCategories,
    className
  }) => {
  return (
    <section className="py-3">
      <Container>
        <h2 className={cn(
          "text-4xl font-semibold mb-5",
          "max-xl:text-3xl max-xl:mb-3",
          "max-md:mb-2",
        )}>
          {title}
        </h2>

        <ul className={cn(
          "grid grid-cols-3 gap-5 mb-15",
          "max-xl:grid-cols-2 mb-10",
          "max-md:grid-cols-1 mb-5",
          className
        )}>
          {productCategories.map((category) => (
            <li className={cn(
              "bg-[var(--gray)] rounded-3xl overflow-hidden p-7",
              "max-xl:p-5",
            )} key={category.id}>
              <div
                className="flex shrink-0 overflow-hidden h-[100px] w-full rounded-md mb-5 max-md:mb-2">
                {category.banner_image_url ? (
                  <Image
                    className="transition-transform object-contain"
                    src={category.banner_image_url}
                    alt={category.name}
                    width={100}
                    height={100}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 text-gray-400 text-sm flex items-center justify-center">
                    нет фото
                  </div>
                )}
              </div>
              <Link
                href={`/catalog/${category.slug}`}
                className={cn(
                  "block text-2xl font-semibold mb-5 max-md:mb-2",
                  "hover:text-[var(--violet)] focus:text-[var(--violet)] transition-colors duration-300",
                  "max-md:text-xl"
                )}
              >
                {category.name}
              </Link>

              <p className={"text-sm mb-5 max-md:mb-2 max-md:text-xs"}>{category.description}</p>

              <Link href={`/catalog/${category.slug}`}>
                <Button
                  className={cn(
                    "inline-block rounded-3xl bg-[var(--violet)] text-white",
                    "max-md:text-xs"
                  )}
                >
                  Смотреть все
                </Button>
              </Link>
            </li>
          ))}
        </ul>

        <section>
          <h3 className={cn(
            "text-3xl font-semibold mb-5",
            "max-xl:text-3xl max-xl:mb-3",
            "max-md:text-2xl max-md:mb-2",
          )}>
            Комплектующие
          </h3>
          <AccessoriesSimpleList accessoryCategories={accessoryCategories}/>
        </section>

      </Container>
    </section>
  );
};
