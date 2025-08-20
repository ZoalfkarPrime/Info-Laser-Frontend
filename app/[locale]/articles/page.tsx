import {Container} from "@/components/shared/Container";
import React from "react";
import {cn} from "@/lib/utils";
import {ArticlesHeader} from "@/components/shared/articles/ArticlesHeader";
import {getCategories, getProducts} from "@/api/api";
import Link from "next/link";
import Image from "next/image";
import {IndividualRequestForm} from "@/components/shared/forms/IndividualRequestForm";
import {SocialAndOnlineMini} from "@/components/shared/banners/SocialAndOnlineMini";
import {getTranslations} from "next-intl/server";
import {UniqButtonLink} from "@/components/ui/UniqButtonLink";

export async function generateMetadata({params: paramsPromise}: { params: Promise<{ locale: string }> }) {
  const {locale} = await paramsPromise;
  const t = await getTranslations({locale});

  return {
    title: `${t('blogMetaTitle')}`,
    description: `${t('blogMetaDescription')}`,
  };
}

export default async function ArticlesPage() {

  const {products} = await getProducts();
  const categories = await getCategories();

  return (
    <>
      <section>

        <ArticlesHeader className={"mb-15 max-xl:mb-10 max-md:mb-7"} products={products}/>

        <section className={cn("mb-15 max-md:mb-10")}>
          <Container>

            <div className={"max-w-[620px] text-center mx-auto mb-10 max-md:mb-5"}>
              <h2 className={cn(
                "text-4xl font-semibold",
                "max-xl:text-3xl",
                "max-md:text-2xl"
              )}>
                Руководства, инструкции, обзоры и справочные материалы
              </h2>
            </div>

            <ul className={cn(
              "grid grid-cols-3 gap-5",
              "max-xl:grid-cols-2",
              "max-md:grid-cols-1"
            )}>
              {categories.map((category) => (
                <li className={"flex flex-col p-8 bg-[var(--gray)] rounded-4xl"} key={category.id}>
                  <Image
                    src={category.banner_image_url}
                    alt={"#"}
                    width={55}
                    height={55}
                    className={"mb-5 max-md:mb-3 max-md:max-w-[30px]"}
                  />

                  <Link
                    href={"#"}
                    className={"text-2xl font-semibold mb-5 hover:text-[var(--violet)] focus:text-[var(--violet)] transition-colors max-md:text-lg max-md:mb-3"}
                  >
                    {category.name}
                  </Link>

                  <ul className={cn("flex-1 mb-3 space-y-3 max-md:space-y-1")}>
                    {category.products.slice(0, 3).map((product) => (
                      <li
                        key={product.id}
                        className={cn("flex gap-2")}
                      >
                        <Image
                          src={category.banner_image_url}
                          alt={"#"}
                          width={35}
                          height={35}
                          className={"max-md:max-w-[25px]"}
                        />
                        <Link
                          href={"#"}
                          className={"text-sm hover:text-[var(--violet)] focus:text-[var(--violet)] transition-colors max-md:text-xs"}
                        >
                          {product.name}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <UniqButtonLink
                    variant={"violetDark"}
                    href={"#"}
                    className={"place-self-start"}
                  >
                    Смотреть все
                  </UniqButtonLink>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        <IndividualRequestForm className={"mb-15 max-md:mb-7"}/>

        <SocialAndOnlineMini className={"mb-15 max-md:mb-7"}/>

      </section>
    </>
  );
};
