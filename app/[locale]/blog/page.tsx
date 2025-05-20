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

        <ArticlesHeader className={"mb-15"} products={products}/>

        <section className={cn("mb-15")}>
          <Container>

            <div className={"max-w-[620px] text-center mx-auto mb-10"}>
              <h2 className={"text-4xl font-semibold"}>
                Руководства, инструкции, обзоры и справочные материалы
              </h2>
            </div>

            <ul className={cn("grid grid-cols-3 gap-5")}>
              {categories.map((category) => (
                <li className={"flex flex-col p-8 bg-[var(--gray)] rounded-4xl"} key={category.id}>
                  <Image
                    src={category.banner_image_url}
                    alt={"#"}
                    width={55}
                    height={55}
                    className={"mb-5"}
                  />

                  <Link
                    href={"#"}
                    className={"text-2xl font-semibold mb-5 hover:text-[var(--violet)] focus:text-[var(--violet)] transition-colors"}
                  >
                    {category.name}
                  </Link>

                  <ul className={cn("flex-1 mb-3")}>
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
                          className={"mb-5"}
                        />
                        <Link
                          href={"#"}
                          className={"text-sm hover:text-[var(--violet)] focus:text-[var(--violet)] transition-colors"}
                        >
                          {product.name}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <Link
                    className={cn(
                      "self-start inline-flex items-center justify-center text-sm text-[var(--violet)] bg-[var(--violet-dark)] py-2 px-5 rounded-3xl",
                      "hover:bg-[var(--violet)] hover:text-white focus:bg-[var(--violet)] focus:text-white transition-colors",
                    )}
                    href={"#"}
                  >
                    Смотреть все
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        <IndividualRequestForm className={"mb-15"}/>

        <SocialAndOnlineMini className={"mb-15"}/>

      </section>
    </>
  );
};
