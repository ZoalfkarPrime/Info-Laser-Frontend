import {cn} from "@/lib/utils";
import React from "react";
import {Article, ClassName} from "@/types/types";
import {ArticlesCard} from "@/components/shared/articles/ArticlesCard";

interface ArticlesGroupListProps extends ClassName {
  articles: Article[];
}

export const ArticlesGroupListMain: React.FC<ArticlesGroupListProps> = ({className, articles}) => {

  return (
    <ul className={cn("grid grid-cols-12 gap-5", className)}>
      {articles.map((article) => (
        <li
          key={article.id}
          className={cn(
            "col-span-6",
            "bg-[var(--gray)] rounded-xl p-3"
          )}
        >
          <ArticlesCard {...article}/>
        </li>
      ))}
    </ul>
  );
}
