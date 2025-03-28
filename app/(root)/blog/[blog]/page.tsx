import {Container} from "@/components/shared/Container";
import {ArticleCategories} from "@/components/shared/articles/ArticlesCategories";
import {ArticlesGroupListMain} from "@/components/shared/articles/ArticlesGroupListMain";
import React from "react";

interface CategoryProps {
  params: Promise<{ blog: string }>;
}

const BlogPage: React.FC<CategoryProps> = async ({params}) => {
  const data = {
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
              },
            ],
          },
        ],
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
              },
            ],
          },
        ],
      },
    ],
  };

  const {blog: category} = await params;
  const currentCategory = data.allArticles.find((cat) => cat.slug === category);

  return (
    <section>
      <Container className="py-5">
        <div className="grid grid-cols-3 gap-5">
          <div className="col-span-2">
            <h1 className="text-3xl font-semibold mb-5">{currentCategory?.title || "Категория не найдена"}</h1>
            <p>
              В блог-центре Infolazer вы можете получить базовые знания о лазерной резке и гравировке, ознакомиться с
              экспертными обзорами лазерных станков, вдохновиться идеями лазерной резки и гравировки и т. д. Давайте
              начнем учиться прямо сейчас.
            </p>
          </div>

          <ArticleCategories categories={data.allArticles} activeCategory={currentCategory?.slug}/>

          <ArticlesGroupListMain articles={currentCategory?.articles || []}/>
        </div>
      </Container>
    </section>
  );
};

export default BlogPage;
