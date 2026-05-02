import { cn } from "@/lib/utils";
import React from "react";
import { ClassName } from "@/types/types";
import { Container } from "@/components/shared/Container";
import { ArticlesGroupListMain } from "@/components/shared/articles/ArticlesGroupListMain";
import { ArticleCategoriesMain } from "@/components/shared/articles/ArticlesCategoriesMain";

import { getArticles } from "@/api/api";

export const ArticlesOnMain = async ({ className }: ClassName) => {
  const { articles } = await getArticles();
  console.log(articles);


  const twoArticles = articles.slice(0, 2);

  // Extract unique categories
  const categoriesMap = new Map();
  articles.forEach(article => {
    article.articleCategory.forEach(cat => {
      if (!categoriesMap.has(cat.id)) {
        categoriesMap.set(cat.id, {
          id: cat.id,
          name: cat.name,
          slug: cat.slug
        });
      }
    });
  });

  const allCategories = Array.from(categoriesMap.values());

  const data = {
    twoArticles,
    allArticles: allCategories
  };

  return (
    <section className={cn("py-7 max-md:py-3", className)}>
      <Container>
        <h1 className={cn(
          "text-4xl font-bold mb-5",
          "max-xl:text-3xl",
          "max-md:text-2xl max-md:mb-3"
        )}>
          База знаний
        </h1>

        <div className={cn(
          "grid grid-cols-3 gap-5"
        )}>
          <section className={cn(
            "col-span-2",
            "max-md:col-span-full"
          )}>
            <ArticlesGroupListMain articles={data.twoArticles} />
          </section>

          <ArticleCategoriesMain
            className={cn(
              "max-md:col-span-full",
            )}
            categories={data.allArticles}
          />

        </div>
      </Container>
    </section>
  );
}
