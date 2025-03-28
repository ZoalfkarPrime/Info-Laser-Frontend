import {Container} from "@/components/shared/Container";
import React from "react";
import Image from "next/image";

interface ArticlePageProps {
  params: Promise<{ article: string }>;
}

const ArticlePage: React.FC<ArticlePageProps> = async ({params}) => {

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
    ]
  };

  const {article} = await params;

  const oneArticle = data.articles.find((item) => item.slug === article);

  return (
    <div>
      <Container>

        {oneArticle ? (
          <div className="mt-5">
            <h1 className="text-2xl font-semibold">{oneArticle.name}</h1>
            <Image src={oneArticle.image} alt={oneArticle.name} width={430} height={200}/>
            <p className="mt-2">{oneArticle.description}</p>
          </div>
        ) : (
          <p className="text-red-500">Статья не найдена</p>
        )}
      </Container>
    </div>
  );
};

export default ArticlePage;
