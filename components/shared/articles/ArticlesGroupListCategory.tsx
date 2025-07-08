import {cn} from "@/lib/utils";
import React from "react";
import {Article, ClassName} from "@/types/types";
import {ArticlesCard} from "@/components/shared/articles/ArticlesCard";
import {ArticlesCardMain} from "@/components/shared/articles/ArticlesCardMain";

interface ArticlesGroupListProps extends ClassName {
  articles: Article[];
}

export const ArticlesGroupListCategory: React.FC<ArticlesGroupListProps> = ({className, articles}) => {
  return (
    <ul className={cn("grid grid-cols-12 gap-5", className)}>
      {articles.map((article) => {
        const isMain = Boolean(article.isMain);
 
        return (
          <li
            key={article.id}
            className={cn(
              isMain ? "col-span-8 max-lg:col-span-6 max-lg:p-3 max-md:col-span-full" : "col-span-4 p-3 max-lg:col-span-6 max-md:col-span-full",
              "bg-[var(--gray)] rounded-xl",
            )}
          >
            {isMain ? (
              <>
                <ArticlesCardMain className={"max-lg:hidden"} {...article} />
                <ArticlesCard className={"lg:hidden"} {...article} />
              </>
            ) : (
              <ArticlesCard {...article} />
            )}
          </li>
        );
      })}
    </ul>
  );
};
