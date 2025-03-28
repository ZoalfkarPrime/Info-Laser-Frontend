import {cn} from "@/lib/utils";
import React from "react";
import {Article, ClassName} from "@/types/types";
import {ArticlesCard} from "@/components/shared/articles/ArticlesCard";

interface ArticlesGroupListProps extends ClassName {
  articles: Article[];
}

export const ArticlesGroupListMain: React.FC<ArticlesGroupListProps> = ({className, articles}) => {

  return (
    <ul className={cn("flex gap-5", className)}>
      {articles.map((article) => (
        <li key={article.id} className={"bg-[var(--gray)] rounded-xl p-3 max-w-[445px]"}>
          <ArticlesCard {...article}/>
        </li>
      ))}
    </ul>
  );
}
