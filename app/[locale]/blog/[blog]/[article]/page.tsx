import {Container} from "@/components/shared/Container";
import React from "react";
import Image from "next/image";
import {getTranslations} from "next-intl/server";

interface ArticlePageProps {
  params: Promise<{ article: string }>;
}

const data = {
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
          title: "Как выбрать лазерное оборудование? Преимущества, особенности, недостатки, комплектация",
          slug: "how-chose-laser-equipment",
        },
      ],
    },
    {
      id: 13,
      name: "Как работает лазерная очистка",
      slug: "kak-rabotaet-lazernaya-ochistka2",
      description: "Описание как работает лазерная очистка",
      isMain: Boolean(0),
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
    {
      id: 8,
      name: "sdfg sdfgdsfg dsfg ",
      slug: "kak-rabotaet-lazernaya-ochistka",
      description: "Описание как работает лазерная очистка",
      isMain: Boolean(0),
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
    {
      id: 9,
      name: "MAIN ARTICLE 2",
      slug: "kak-rabotaet-lazernaya-ochistka",
      description: "Описание как работает лазерная очистка",
      isMain: Boolean(1),
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
  ]
};

export async function generateMetadata(
  {
    params: paramsPromise
  }: {
    params: Promise<{ locale: string; article: string }>;
  }) {
  const {locale, article} = await paramsPromise;
  const t = await getTranslations({locale});

  const oneArticle = data.articles.find((item) => item.slug === article);
  const title = oneArticle?.name || t("blogMetaTitle");

  return {
    title,
    description: ``,
  };
}

const ArticlePage: React.FC<ArticlePageProps> = async ({params}) => {

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
