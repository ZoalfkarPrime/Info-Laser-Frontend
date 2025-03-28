import {Container} from "@/components/shared/Container";
import {ArticleCategories} from "@/components/shared/articles/ArticlesCategories";
import React from "react";
import {cn} from "@/lib/utils";
import {ArticlesCard} from "@/components/shared/articles/ArticlesCard";

const ArticlesPage: React.FC = () => {
  const data = {
    articles: [
      {
        id: 2,
        name: "Как работает лазерный маркиратор",
        slug: "kak-rabotaet-lazernyy-markirator",
        description: "Сегодня лазерный маркер является самым производительным скоростным типом оборудования",
        date: "14.05.2025",
        image: "/img/articles/articles-main/1.jpg",
        articleCategory: [
          {
            id: 1,
            title: "Инструкции по настройке и эксплуатации лазерного оборудования",
            slug: "instrukcii",
          }
        ]
      },
      {
        id: 3,
        name: "Как работает лазерная очистка",
        slug: "kak-rabotaet-lazernaya-ochistka",
        description: "Описание как работает лазерная очистка",
        date: "08.05.2025",
        image: "/img/articles/articles-main/2.jpg",
        articleCategory: [
          {
            id: 2,
            title: "Как выбрать лазерное оборудование? Преимущества, особенности, недостатки, комплектация",
            slug: "how-chose-laser-equipment",
          }
        ]
      }
    ],
    allArticles: [
      {
        id: 1,
        title: "Инструкции по настройке и эксплуатации лазерного оборудования",
        slug: "instrukcii",
        articles: [
          {
            id: 2,
            name: "Как работает лазерный маркиратор",
            slug: "kak-rabotaet-lazernyy-markirator",
            description: "Сегодня лазерный маркер является самым производительным скоростным типом оборудования",
            date: "14.05.2025",
            image: "/img/articles/articles-main/1.jpg",
            articleCategory: [
              {
                id: 1,
                title: "Инструкции по настройке и эксплуатации лазерного оборудования",
                slug: "instrukcii",
              }
            ]
          }
        ]
      },
      {
        id: 2,
        title: "Как выбрать лазерное оборудование? Преимущества, особенности, недостатки, комплектация",
        slug: "how-chose-laser-equipment",
        articles: [
          {
            id: 3,
            name: "Как работает лазерная очистка",
            slug: "kak-rabotaet-lazernaya-ochistka",
            description: "Описание как работает лазерная очистка",
            date: "08.05.2025",
            image: "/img/articles/articles-main/2.jpg",
            articleCategory: [
              {
                id: 2,
                title: "Как выбрать лазерное оборудование? Преимущества, особенности, недостатки, комплектация",
                slug: "how-chose-laser-equipment",
              }
            ]
          }
        ]
      },
    ],
  };

  return (
    <section>
      <Container className="py-5">
        <div className="grid grid-cols-3 gap-5">

          <div className={"col-span-2"}>
            <h1 className={"text-3xl font-semibold mb-5"}>Все статьи</h1>
            <p>В блог-центре Infolazer вы можете получить базовые знания о лазерной резке и гравировке, ознакомиться с
              экспертными обзорами лазерных станков, вдохновиться идеями лазерной резки и гравировки и т. д. Давайте
              начнем
              учиться прямо сейчас.</p>
          </div>

          <ArticleCategories categories={data.allArticles}/>

          <ul className={cn("grid grid-cols-2 col-span-2")}>
            {data.articles.map((article) => (
              <li key={article.id} className={"bg-[var(--gray)] rounded-xl p-3 max-w-[445px]"}>
                <ArticlesCard {...article}/>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
};

export default ArticlesPage;
