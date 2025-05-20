import {Container} from "@/components/shared/Container";
import {ArticleCategories} from "@/components/shared/articles/ArticlesCategories";
import React from "react";
import {ArticlesGroupListCategory} from "@/components/shared/articles/ArticlesGroupListCategory";
import {PaginationControls} from "@/components/shared/products/PaginationControls";
import qs from "qs";
import {IndividualRequestForm} from "@/components/shared/forms/IndividualRequestForm";
import {SocialAndOnlineMini} from "@/components/shared/banners/SocialAndOnlineMini";
import {getTranslations} from "next-intl/server";

const data = {
  allArticles: [
    {
      id: 1,
      title: "Инструкции по настройке и эксплуатации лазерного оборудования",
      slug: "instrukcii",
      articles: [
        {
          id: 6,
          name: "MAIN MAIN MAIN",
          slug: "kak-rabotaet-lazernyy-markirator",
          description: "Сегодня WERT WERT EWRTW ",
          isMain: Boolean(1),
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
              title: "Инструкции по настройке и эксплуатации лазерного оборудования",
              slug: "instrukcii",
            },
          ],
        },
        {
          id: 14,
          name: "Как работает лазерный маркиратор",
          slug: "kak-rabotaet-lazernyy-markirator",
          description: "Сегодня лазерный маркер является самым производительным скоростным типом оборудования",
          isMain: Boolean(0),
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
        {
          id: 4,
          name: "rtyrtb fgb fgb fgb ",
          slug: "kak-rabotaet-lazernyy-markirator",
          description: "Сегодня лазерный маркер явлfgdf dfg fdg ",
          isMain: Boolean(0),
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
        {
          id: 20,
          name: "222222 22222 2 22 2",
          slug: "kak-rabotaet-lazernyy-markirator",
          description: "Сегодня лазерный маркер явлfgdf dfg fdg ",
          isMain: Boolean(0),
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
        {
          id: 222,
          name: "33 3 3 3333 333  3 3 ",
          slug: "kak-rabotaet-lazernyy-markirator",
          description: "Сегодня лазерный маркер явлfgdf dfg fdg ",
          isMain: Boolean(0),
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
        {
          id: 333,
          name: "33 3 33 3 333 3 3 3",
          slug: "kak-rabotaet-lazernyy-markirator",
          description: "Сегодня лазерный маркер явлfgdf dfg fdg ",
          isMain: Boolean(1),
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
        {
          id: 444,
          name: "44 4 444 4 4 4444 4 4  ",
          slug: "kak-rabotaet-lazernyy-markirator",
          description: "Сегодня лазерный маркер явлfgdf dfg fdg ",
          isMain: Boolean(0),
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
        {
          id: 5,
          name: "55 5 5 5 55 5 ",
          slug: "kak-rabotaet-lazernyy-markirator",
          description: "Сегодня лазерный маркер явлfgdf dfg fdg ",
          isMain: Boolean(0),
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
      ],
    },
  ],
};

interface CategoryProps {
  params: Promise<{ blog: string }>;
  searchParams: Promise<{
    page?: string;
  }>;
}

export async function generateMetadata({params: paramsPromise}: {
  params: Promise<{ locale: string; blog: string }>;
}) {
  const {locale, blog} = await paramsPromise;
  const t = await getTranslations({locale});

  const currentCategory = data.allArticles.find(cat => cat.slug === blog);
  const title = currentCategory?.title || t("blogMetaTitle");

  return {
    title,
    description: ``,
  };
}

const BlogPage: React.FC<CategoryProps> = async ({params, searchParams}) => {

  const {blog} = await params;
  const currentCategory = data.allArticles.find((cat) => cat.slug === blog);

  // Пагинация
  const sp = await searchParams;
  const page = parseInt(sp.page || "1", 10);
  const itemsPerPage = 7;

  const currentParams = {
    ...sp,
    page: undefined,
  };
  const queryString = qs.stringify(currentParams, {encode: false});

  const categoryArticles = currentCategory?.articles || [];
  const totalArticles = categoryArticles.length;
  const totalPages = Math.ceil(totalArticles / itemsPerPage);
  const paginatedArticles = categoryArticles.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <>
      <section>
        <Container className="pt-5">
          <h1 className="text-5xl font-semibold mb-20">{currentCategory?.title || "Категория не найдена"}</h1>

          <div className="grid grid-cols-12 gap-5 mb-10">
            <ArticleCategories
              className={"col-start-9 col-end-13"}
              categories={data.allArticles}
              activeCategory={currentCategory?.slug}
            />
          </div>

          <ArticlesGroupListCategory
            articles={paginatedArticles}
            className={"mb-10"}
          />

          <PaginationControls
            currentPage={page}
            totalPages={totalPages}
            basePath={`/blog/${blog}`}
            query={queryString}
            className="mb-15"
          />

        </Container>
      </section>

      <IndividualRequestForm className={"mb-10"}/>

      <SocialAndOnlineMini/>
    </>
  );
};

export default BlogPage;
