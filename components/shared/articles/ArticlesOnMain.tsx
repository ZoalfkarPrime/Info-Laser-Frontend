import {cn} from "@/lib/utils";
import React from "react";
import {ClassName} from "@/types/types";
import {Container} from "@/components/shared/Container";
import {ArticlesGroupListMain} from "@/components/shared/articles/ArticlesGroupListMain";
import {ArticleCategoriesMain} from "@/components/shared/articles/ArticlesCategoriesMain";

export const ArticlesOnMain: React.FC<ClassName> = ({className}) => {

  const data = {
    twoArticles: [
      {
        id: 2,
        name: "Как работает лазерный маркиратор",
        slug: "kak-rabotaet-lazernyy-markirator",
        description: "Сегодня лазерный маркер является самым производительным скоростным типом оборудования",
        isMain: Boolean(0),
        date: "14.05.2025",
        image: "/img/articles/articles-main/1.jpg",
        articleCategory: [
          {
            id: 1,
            name: "Инструкции по настройке и эксплуатации лазерного оборудования",
            slug: "instrukcii",
          }
        ]
      },
      {
        id: 3,
        name: "Как работает лазерная очистка",
        slug: "kak-rabotaet-lazernaya-ochistka",
        description: "Описание как работает лазерная очистка",
        isMain: Boolean(0),
        date: "08.05.2025",
        image: "/img/articles/articles-main/2.jpg",
        articleCategory: [
          {
            id: 2,
            name: "Как выбрать лазерное оборудование? Преимущества, особенности, недостатки, комплектация",
            slug: "how-chose-laser-equipment",
          }
        ]
      }
    ],
    allArticles: [
      {
        id: 1,
        name: "Инструкции по настройке и эксплуатации лазерного оборудования",
        slug: "instrukcii",
        articles: [
          {
            id: 2,
            name: "Как работает лазерный маркиратор",
            slug: "kak-rabotaet-lazernyy-markirator",
            description: "Сегодня лазерный маркер является самым производительным скоростным типом оборудования",
            isMain: Boolean(0),
            date: "14.05.2025",
            image: "/img/articles/articles-main/1.jpg",
            articleCategory: [
              {
                id: 1,
                name: "Инструкции по настройке и эксплуатации лазерного оборудования",
                slug: "instrukcii",
              }
            ]
          }
        ]
      },
      {
        id: 2,
        name: "Как выбрать лазерное оборудование? Преимущества, особенности, недостатки, комплектация",
        slug: "how-chose-laser-equipment",
        articles: [
          {
            id: 3,
            name: "Как работает лазерная очистка",
            slug: "kak-rabotaet-lazernaya-ochistka",
            description: "Описание как работает лазерная очистка",
            isMain: Boolean(0),
            date: "08.05.2025",
            image: "/img/articles/articles-main/2.jpg",
            articleCategory: [
              {
                id: 2,
                name: "Как выбрать лазерное оборудование? Преимущества, особенности, недостатки, комплектация",
                slug: "how-chose-laser-equipment",
              }
            ]
          }
        ]
      },
    ],
  };

  return (
    <section className={cn("py-7", className)}>
      <Container>
        <h1 className={"text-4xl font-bold mb-5"}>База знаний</h1>

        <div className="grid grid-cols-3 gap-5">
          <section className={"col-span-2"}>
            <ArticlesGroupListMain articles={data.twoArticles}/>
          </section>

          <ArticleCategoriesMain categories={data.allArticles}/>

        </div>
      </Container>
    </section>
  );
}
