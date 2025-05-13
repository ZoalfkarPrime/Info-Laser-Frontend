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
              isMain ? "col-span-8" : "col-span-4 p-3",
              "bg-[var(--gray)] rounded-xl "
            )}
          >
            {isMain ? (
              <ArticlesCardMain {...article} />
            ) : (
              <ArticlesCard {...article} />
            )}
          </li>
        );
      })}
    </ul>
  );
};
