import Link from "next/link";
import {ChevronLeft} from "lucide-react";
import React from "react";
import {ArticleCategoriesProps, ClassName} from "@/types/types";
import {cn} from "@/lib/utils";
import {UniqButtonLink} from "@/components/ui/UniqButtonLink";

interface ArticlesGroupListUpd extends ClassName {
  categories: ArticleCategoriesProps[];
}

export const ArticleCategoriesMain: React.FC<ArticlesGroupListUpd> = ({className, categories}) => {

  return (
    <aside className={cn("", className)}>
      <h2 className={"text-[22px] font-semibold mb-3"}>Разделы статей</h2>
      <ul className={"mb-4"}>
        {categories.map((section) => (
          <li key={section.id} className={"not-last:mb-3"}>
            <Link
              className={cn(
                "group flex gap-3 hover:text-[var(--violet)] focus:text-[var(--violet)] leading-5 transition-colors duration-300",
                "max-md:text-xs max-md:gap-2"
              )}
              href={`/articles/${section.slug}`}
            >
              <div
                className={"flex flex-shrink-0 items-center justify-center h-7 w-7 rounded-full bg-[var(--violet-dark)] rotate-180 p-0"}
              >
                <ChevronLeft
                  size={"16"}
                  className={"relative text-[var(--violet)] transition-colors duration-300 group-hover:text-[var(--red)] group-focus:text-[var(--red)]"}
                />
              </div>
              {section.name}
            </Link>
          </li>
        ))}
      </ul>
      <UniqButtonLink href="/articles" variant="violetOutline">
        Все статьи
      </UniqButtonLink>
    </aside>
  );
}
