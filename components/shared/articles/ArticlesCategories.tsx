import Link from "next/link";
import {ChevronLeft} from "lucide-react";
import React from "react";
import {ArticleCategoriesProps, ClassName} from "@/types/types";
import {cn} from "@/lib/utils";

interface ArticlesGroupListUpd extends ClassName {
  categories: ArticleCategoriesProps[];
  activeCategory?: string;
}

export const ArticleCategories: React.FC<ArticlesGroupListUpd> = ({className, categories, activeCategory}) => {

  return (
    <aside className={cn("", className)}>
      <h2 className={"text-[22px] font-semibold mb-3"}>Разделы статей</h2>
      <ul className={"mb-4"}>
        {categories.map((section) => {
          const isActive = activeCategory === section.slug;

          return (
            <li key={section.id} className={"not-last:mb-3"}>
              {isActive ? (
                <div
                  className={cn(
                    "group flex gap-3 leading-5 transition-colors duration-300 text-[var(--violet)] hover:text-[var(--violet)] focus:text-[var(--violet)]"
                  )}
                >
                  <div
                    className={"flex flex-shrink-0 items-center justify-center h-7 w-7 rounded-full bg-[var(--violet-dark)] rotate-180 p-0"}
                  >
                    <ChevronLeft size={"16"} className={"relative text-[var(--red)]"}/>
                  </div>
                  {section.name}
                </div>
              ) : (
                <Link
                  className={cn(
                    "group flex gap-3 hover:text-[var(--violet)] focus:text-[var(--violet)] leading-5 transition-colors duration-300",
                    isActive && "text-[var(--violet)] hover:text-[var(--violet)] focus:text-[var(--violet)]"
                  )}
                  href={`/articles/${section.slug}`}
                >
                  <div
                    className={"flex flex-shrink-0 items-center justify-center h-7 w-7 rounded-full bg-[var(--violet-dark)] rotate-180 p-0"}
                  >
                    <ChevronLeft
                      size={"16"}
                      className={cn(
                        "relative text-[var(--violet)] transition-colors duration-300 group-hover:text-[var(--red)] group-focus:text-[var(--red)]",
                        isActive && "text-[var(--red)]"
                      )}
                    />
                  </div>
                  {section.name}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
