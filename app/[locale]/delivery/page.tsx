import {getTranslations} from "next-intl/server";
import {DeliveryHeader} from "@/components/shared/delivery/DeliveryHeader";
import {PurchaseList} from "@/components/shared/delivery/PurchaseList";
import {DeliveryPickup} from "@/components/shared/delivery/DeliveryPickup";
// import Script from "next/script";
import {ProductReturn} from "@/components/shared/delivery/ProductReturn";
import {SocialAndOnlineMini} from "@/components/shared/banners/SocialAndOnlineMini";
import React from "react";

export async function generateMetadata({params: paramsPromise}: { params: Promise<{ locale: string }> }) {
  const {locale} = await paramsPromise;
  const t = await getTranslations({locale});

  return {
    title: `${t('deliveryMetaTitle')}`,
    description: `${t('deliveryMetaDescription')}`,
  };
}

const DeliveryPage = () => {

  const data = {
    first_list: [
      {
        id: 1,
        text: "На Лазерные станки некоторых поставщиков может распространяться увеличенная гарантия."
      },
      {
        id: 2,
        text: "Гарантия не распространяется на расходные материалы, в том числе и те, которыми комплектуются при поставке Лазерные станки."
      },
      {
        id: 3,
        text: "В том случае, если поставленное нами Лазерный станок (НЕ расходные материалы, а сам Лазерный станок) вышло из строя, мы обязательно поможем вам восстановить его работоспособность."
      },
      {
        id: 4,
        text: "При наличии специального модуля станки также смогут резать трубы круглого и прямоугольного сечения."
      }
    ],
    second_list: [
      {
        id: 1,
        text: "Перед вам отправкой Лазерных станков мы проверяем его."
      },
      {
        id: 2,
        text: "Запускаем и оцениваем качество его работы."
      },
      {
        id: 3,
        text: "После того, как мы убедимся, что Лазерный станок соответствует нашим требованиям и работает исправно, мы его отправляем вам."
      }
    ]
  };

  return (
    <>
      {/*<Script*/}
      {/*  src={`https://api-maps.yandex.ru/v3/?apikey=${process.env.NEXT_PUBLIC_YANDEX_MAP_KEY}&lang=ru_RU`}*/}
      {/*  strategy="beforeInteractive"*/}
      {/*/>*/}
      <section>
        <DeliveryHeader/>
        <PurchaseList/>
        <DeliveryPickup/>
        <ProductReturn data={data}/>
        <SocialAndOnlineMini className={"mb-15"}/>
      </section>
    </>
  );
};

export default DeliveryPage;
