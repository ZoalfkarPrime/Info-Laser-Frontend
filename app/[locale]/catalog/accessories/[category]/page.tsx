import {Container} from "@/components/shared/Container";
import {getCatalogData} from "@/api/api";
import {cn} from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import {getTranslations} from "next-intl/server";
import {CircleCheck} from "lucide-react";

interface AccessoriesCategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({params: paramsPromise}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const {locale, category} = await paramsPromise;
  const t = await getTranslations({locale});
  const {accessory} = await getCatalogData();

  const currentCategory = accessory.find((cat) => cat.slug === category);

  return {
    title: currentCategory?.name
      ? `${currentCategory.name} ${t('addName')}`
      : t("catalogMetaTitle"),
    description: currentCategory?.description || "",
  };
}

const AccessoriesCategoryPage = async ({params}: AccessoriesCategoryPageProps) => {
  const {accessory} = await getCatalogData();
  const {category} = await params;

  const currentCategory = accessory.find((cat) => cat.slug === category);

  const data = {
    data_first: [
      {
        id: 1,
        text: "Промышленная: маркировка продукции в условиях промышленного производства. Нанесение на изделия даты выпуска, номера партии, штрих-кода и т. д."
      },
      {
        id: 2,
        text: "Рекламная: маркировка сувениров, табличек, номерков и канцелярских принадлежностей."
      }
    ],
    data_second: [
      {
        id: 1,
        text: "Бесконтактный процесс нанесения. Изделие не требует фиксации во время обработки;"
      },
      {
        id: 2,
        text: "Качественное нанесение миниатюрной информации. Обеспечивает гарантированное считывание знаков, штрих кодов, текстовой и графической информации;"
      },
      {
        id: 3,
        text: "Функция регулирования скорости перемещения луча, частоты следования импульса и мощности лазерного излучения;"
      }
    ],
  };

  return (
    <section>
      <Container>
        <h1 className={cn(
          "text-4xl font-semibold mb-7",
          "max-xl:text-3xl max-xl:mb-5",
          "max-md:text-2xl",
        )}>
          {currentCategory?.name}
        </h1>

        <ul className={cn(
          "grid grid-cols-4 gap-5 mb-20",
          "max-xl:grid-cols-3 max-xl:gap-3",
          "max-md:grid-cols-2 max-md:gap-3 max-md:mb-10",
        )}>
          {currentCategory?.products.map((category) => (
            <li
              key={category.slug}
              className={"bg-[var(--gray)] rounded-3xl overflow-hidden"}
            >
              <Link
                href={`/catalog/accessories/${currentCategory?.slug}/${category.slug}/`}
                className={cn(
                  "flex gap-5 items-center text-sm transition-colors duration-300 p-5",
                  "hover:text-[var(--violet)] focus:text-[var(--violet)]",
                  "hover:[&>div>img]:scale-110 focus:[&>div>img]:scale-110",
                  "max-md:text-xs"
                )}
              >
                {category.product_attachments && category.product_attachments[0] ? (
                  <Image
                    className={cn(
                      "shrink-0 transition-transform max-w-[100px] max-h-[100px]",
                      "max-md:max-w-[40px] max-md:max-h-[40px]",
                    )}
                    src={category.product_attachments[0].external_url}
                    alt={category.product_attachments[0].name}
                    width={category.product_attachments[0].width}
                    height={category.product_attachments[0].height}
                  />
                ) : (
                  <div
                    className={cn(
                      "shrink-0 w-[100px] h-[100px] bg-gray-200 text-gray-400 text-xs flex items-center justify-center",
                      "max-md:max-w-[40px] max-md:max-h-[40px]",
                    )}>
                    нет фото
                  </div>
                )}
                {category.name}
              </Link>
            </li>
          ))}
        </ul>

        <section>
          <h2 className={cn(
            "text-4xl font-semibold mb-7",
            "max-xl:text-3xl max-xl:mb-5",
            "max-md:text-2xl",
          )}>
            Особенности лазерных волоконных маркеров по металлу
          </h2>

          <p className="font-semibold mb-3">Лазерная гравировка делится на два типа:</p>
          <ol className="space-y-3 mb-7">
            {data.data_first.map((item, index) => (
              <li key={item.id} className="flex items-start gap-3">
                <div
                  className="min-w-[25px] min-h-[25px] flex items-center justify-center bg-[var(--violet)]/40 text-white font-bold rounded-full text-xs shrink-0">
                  {index + 1}
                </div>
                <p className="text-sm">{item.text}</p>
              </li>
            ))}
          </ol>

          <p className="font-semibold mb-3">Преимущества лазерной гравировки металлов при помощи маркиратора:</p>
          <ul className="space-y-3">
            {data.data_second.map((item) => (
              <li key={item.id} className="flex items-start gap-3">
                <CircleCheck size={20} className={"text-white fill-[var(--violet)]/30 shrink-0"}/>
                <p className={"text-sm"}>{item.text}</p>
              </li>
            ))}
          </ul>
        </section>
        
      </Container>
    </section>
  );
};

export default AccessoriesCategoryPage;