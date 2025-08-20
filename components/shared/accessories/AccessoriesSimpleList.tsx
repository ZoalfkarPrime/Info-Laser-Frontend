import React from 'react';
import {Category, ClassName} from "@/types/types";
import {cn} from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import {UniqButtonLink} from "@/components/ui/UniqButtonLink";

interface AccessoriesProps extends ClassName {
  accessoryCategories: Category[];
}

export const AccessoriesSimpleList: React.FC<AccessoriesProps> = async ({accessoryCategories, className}) => {
  return (
    <>
      {accessoryCategories.length > 0 && (
        <>
          <ul className={cn(
            "grid grid-cols-3 gap-5",
            "max-xl:grid-cols-2",
            "max-md:grid-cols-1",
            className
          )}>
            {accessoryCategories.map((category) => (
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
                  href={`/catalog/accessories/${category.slug}`}
                  className={cn(
                    "block text-2xl font-semibold mb-5 max-md:mb-2",
                    "hover:text-[var(--violet)] focus:text-[var(--violet)] transition-colors duration-300",
                    "max-md:text-xl"
                  )}
                >
                  {category.name}
                </Link>

                <p className={"text-sm mb-5 max-md:mb-2 max-md:text-xs"}>{category.description}</p>

                <UniqButtonLink
                  variant={"violet"}
                  href={`/catalog/accessories/${category.slug}`}
                  className={"py-2"}
                >
                  Смотреть все
                </UniqButtonLink>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};
