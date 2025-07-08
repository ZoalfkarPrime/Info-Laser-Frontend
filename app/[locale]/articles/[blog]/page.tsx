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
import {cn} from "@/lib/utils";

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
        <Container>
          <div className="grid grid-cols-12 gap-5 mb-10 max-lg:mb-5 max-md:gap-3 max-md:mb-3">
            <div className={cn(
              "col-start-1 col-end-9",
              "max-xl:col-span-full"
            )}>
              <h1 className={cn(
                "text-5xl font-semibold",
                "max-lg:text-3xl",
                "max-md:text-2xl",
              )}>
                {currentCategory?.name}
              </h1>
            </div>
            <ArticleCategories
              className={cn(
                "col-start-9 col-end-13",
                "max-xl:col-span-full"
              )}
              categories={uniqueCategories}
              activeCategory={currentCategory?.slug}
            />
          </div>

          <ArticlesGroupListCategory
            articles={paginatedArticles}
          />

          <PaginationControls
            currentPage={page}
            totalPages={totalPages}
            basePath={`/articles/${blog}`}
            query={queryString}
          />
        </Container>
      </section>

      <IndividualRequestForm className="mb-10 max-md:mb-5"/>
      <SocialAndOnlineMini/>
    </>
  );
};

export default BlogPage;
