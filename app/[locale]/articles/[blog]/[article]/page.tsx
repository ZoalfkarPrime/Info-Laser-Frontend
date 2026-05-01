import { Container } from "@/components/shared/Container";
import React from "react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { cn } from "@/lib/utils";
import { getArticleDetails, getArticles } from "@/api/api";
import { SocialList } from "@/components/shared/social/SocialList";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { ArticlesSimilar } from "@/components/shared/articles/ArticlesSimilar";
import { SocialAndOnlineMini } from "@/components/shared/banners/SocialAndOnlineMini";
import { UniqButtonLink } from "@/components/ui/UniqButtonLink";
import { ArticleContent } from "./components/article-content";

interface ArticlePageProps {
  params: Promise<{ article: string; blog: string }>;
}

export async function generateMetadata(
  {
    params: paramsPromise,
  }: {
    params: Promise<{ locale: string; article: string }>;
  }) {
  const { locale, article } = await paramsPromise;
  const t = await getTranslations({ locale });

  try {
    const oneArticle = await getArticleDetails(article);
    return {
      title: oneArticle.title || t("blogMetaTitle"),
      description: t("blogMetaDescription"),
    };
  } catch {
    return {
      title: t("blogMetaTitle"),
      description: t("blogMetaDescription"),
    };
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { article } = await params;
  let oneArticle;
  
  try {
    oneArticle = await getArticleDetails(article);
  } catch {
    return (
      <Container>
        <p className="text-red-500">Статья не найдена</p>
      </Container>
    );
  }

  const { articles: allArticles } = await getArticles();
  const similarArticles = allArticles.filter(a => a.slug !== article).slice(0, 3);

  return (
    <article>
      <Container>
        <div className="grid grid-cols-12">
          <header className="col-span-full mb-10 max-md:mb-3">
            <h1 className={cn(
              "text-5xl font-semibold mb-5",
              "max-lg:text-3xl",
              "max-md:text-2xl",
            )}>{oneArticle.title}</h1>
            <div className="grid grid-cols-12 gap-5 mb-5 max-md:gap-3">
              <p className={cn(
                "col-start-1 col-end-2 text-sm text-[var(--gray-text)]",
                "max-lg:col-start-1 max-lg:col-end-5 max-lg:text-xs",
              )}>
                Дата:
                <time className="ml-2 text-black" dateTime={oneArticle.publishedAt}>
                  {oneArticle.publishedAt}
                </time>
              </p>
              <p className={cn(
                "col-start-2 col-end-5 text-sm text-[var(--gray-text)] text-center",
                "max-lg:col-start-5 max-lg:col-end-13 max-lg:text-xs"
              )}>
                Автор:
                <span className="ml-2 text-black">Алексей Тихонов</span>
              </p>
              <p className={cn(
                "col-start-8 col-end-13 text-sm text-[var(--gray-text)] text-right",
                "max-lg:col-start-1 max-lg:col-end-13 max-lg:text-start max-lg:text-xs"
              )}>
                Раздел:
                <span className="ml-2 text-black">Инструкции</span>
              </p>
            </div>
            {oneArticle.image && (
              <Image
                className="w-full max-h-[615px] rounded-3xl"
                src={oneArticle.image}
                alt={oneArticle.title}
                width={1380}
                height={615}
                priority
              />
            )}
          </header>
          <div className={cn("relative grid grid-cols-12 col-span-full")}>
            <aside className={cn(
              "col-start-1 col-end-2 sticky top-5 h-max",
              "max-lg:relative max-lg:order-3 max-lg:col-span-full max-lg:flex max-lg:gap-x-5 max-lg:items-center max-lg:py-3"
            )}>
              <p className="font-semibold mb-3 text-center max-lg:text-start max-lg:mb-0 max-md:text-sm">Соцсети</p>
              <SocialList 
                className={cn(
                  "flex-col items-center",
                  "max-lg:flex-row"
                )} 
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                socialMedia={{} as any}
              />
            </aside>
            <div
              className={cn(
                "relative -top-50 col-start-2 col-end-10 bg-white rounded-3xl p-10 border border-[var(--gray-text)]",
                "max-lg:top-0 max-lg:order-2 max-lg:col-span-full max-lg:border-0 max-lg:p-0"
              )}>
              <ArticleContent content={oneArticle.content} />
            </div>
            <aside className={cn(
              "col-start-10 col-end-13 pl-5 sticky top-5 h-max",
              "max-lg:relative max-lg:order-1 max-lg:col-span-full max-lg:top-0 max-lg:mb-3 max-lg:pl-0"
            )}>
              <p className={cn(
                "text-2xl font-semibold mb-5",
                "max-md:text-lg max-md:mb-3"
              )}>Оглавление</p>
              <ul className={"space-y-2"}>
                <li>
                  <Link
                    className={cn(
                      "flex gap-2 text-sm transition-colors",
                      "hover:text-[var(--violet)] focus:text-[var(--violet)]",
                      "max-md:text-xs"
                    )}
                    href={"#how-laser-machine-works"}
                  >
                    <ChevronLeft
                      size={20}
                      className="flex-shrink-0 relative text-[var(--violet)] rotate-180"
                    />
                    Как работает станок для лазерной резки металла?
                  </Link>
                </li>
                <li>
                  <Link
                    className={cn(
                      "flex gap-2 text-sm transition-colors",
                      "hover:text-[var(--violet)] focus:text-[var(--violet)]",
                      "max-md:text-xs"
                    )}
                    href={"#laser-different"}
                  >
                    <ChevronLeft
                      size={20}
                      className="flex-shrink-0 relative text-[var(--violet)] rotate-180"
                    />
                    Главные отличия лазерной резки от других методов резки металла
                  </Link>
                </li>
                <li>
                  <Link
                    className={cn(
                      "flex gap-2 text-sm transition-colors",
                      "hover:text-[var(--violet)] focus:text-[var(--violet)]",
                      "max-md:text-xs"
                    )}
                    href={"#which-metals-can-be-sliced"}
                  >
                    <ChevronLeft
                      size={20}
                      className="flex-shrink-0 relative text-[var(--violet)] rotate-180"
                    />
                    Какие металлы можно резать?
                  </Link>
                </li>
              </ul>
            </aside>
          </div>
        </div>
        <section className={"pt-5 pb-20 max-lg:pb-10"}>
          <div className={"flex justify-between items-center mb-5"}>
            <h2 className={cn(
              "text-[40px] font-semibold",
              "max-lg:text-3xl",
              "max-md:text-2xl"
            )}>Похожие статьи</h2>
            <UniqButtonLink variant="violetOutline" href="/articles">Все статьи</UniqButtonLink>
          </div>
          <ArticlesSimilar articles={similarArticles} />
        </section>
      </Container>
      <SocialAndOnlineMini />
    </article>
  );
};