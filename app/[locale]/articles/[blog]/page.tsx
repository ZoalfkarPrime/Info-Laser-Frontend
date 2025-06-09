import {Container} from "@/components/shared/Container";
import {ArticleCategories} from "@/components/shared/articles/ArticlesCategories";
import React from "react";
import {ArticlesGroupListCategory} from "@/components/shared/articles/ArticlesGroupListCategory";
import {PaginationControls} from "@/components/shared/products/PaginationControls";
import qs from "qs";
import {IndividualRequestForm} from "@/components/shared/forms/IndividualRequestForm";
import {SocialAndOnlineMini} from "@/components/shared/banners/SocialAndOnlineMini";
import {getTranslations} from "next-intl/server";
import {getArticles} from "@/api/api";

interface CategoryProps {
  params: Promise<{ blog: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({params: paramsPromise}: {
  params: Promise<{ locale: string; blog: string }>;
}) {
  const {locale, blog} = await paramsPromise;
  const t = await getTranslations({locale});

  const {articles: allArticles} = await getArticles();

  const uniqueCategories = Array.from(
    new Map(
      allArticles.flatMap((article) =>
        article.articleCategory.map((cat) => [cat.id, cat])
      )
    ).values()
  );

  const currentCategory = uniqueCategories.find(cat => cat.slug === blog);

  return {
    title: currentCategory?.name
      ? `${currentCategory.name} ${t('addName')}`
      : t("blogMetaTitle"),
  };
}

const BlogPage: React.FC<CategoryProps> = async ({params, searchParams}) => {
  const {blog} = await params;
  const sp = await searchParams;
  const page = parseInt(sp.page || "1", 10);
  const itemsPerPage = 7;

  const {articles: allArticles} = await getArticles();

  const uniqueCategories = Array.from(
    new Map(
      allArticles.flatMap((article) =>
        article.articleCategory.map((cat) => [cat.id, cat])
      )
    ).values()
  );

  const currentCategory = uniqueCategories.find(cat => cat.slug === blog);

  const categoryArticles = currentCategory
    ? allArticles.filter(article =>
      article.articleCategory.some(cat => cat.id === currentCategory.id)
    )
    : [];


  const totalArticles = categoryArticles.length;
  const totalPages = Math.ceil(totalArticles / itemsPerPage);

  const paginatedArticles = categoryArticles.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const queryString = qs.stringify({...sp, page: undefined}, {encode: false});

  return (
    <>
      <section>
        <Container className="pt-5">
          <div className="grid grid-cols-12 gap-5 mb-10">
            <ArticleCategories
              className="col-start-9 col-end-13"
              categories={uniqueCategories}
              activeCategory={currentCategory?.slug}
            />
          </div>

          <ArticlesGroupListCategory
            articles={paginatedArticles}
            className="mb-10"
          />

          <PaginationControls
            currentPage={page}
            totalPages={totalPages}
            basePath={`/articles/${blog}`}
            query={queryString}
            className="mb-15"
          />
        </Container>
      </section>

      <IndividualRequestForm className="mb-10"/>
      <SocialAndOnlineMini/>
    </>
  );
};

export default BlogPage;
