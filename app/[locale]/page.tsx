import {BannerMain} from "@/components/shared/carousels/banners/BannerMain";
import {NewProductsSlider} from "@/components/shared/carousels/NewProductsSlider";
import {PartnersSlider} from "@/components/shared/carousels/PartnersSlider";
import {UniqMachinesSlider} from "@/components/shared/carousels/UniqMachinesSlider";
import {OfflineOrOnlineMain} from "@/components/shared/banners/OfflineOrOnlineMain";
import {SimplerTabsMain} from "@/components/shared/tabs/SimplerTabsMain";
import {AboutMain} from "@/components/shared/about/AboutMain";
import {ArticlesOnMain} from "@/components/shared/articles/ArticlesOnMain";
import {getProducts} from "@/api/api";
import {getTranslations} from "next-intl/server";
import {HitsProductsSlider} from "@/components/shared/carousels/HitsProductsSlider";
import {VideoReviews} from "@/components/shared/reviews/VideoReviews";

export async function generateMetadata({params: paramsPromise}: { params: Promise<{ locale: string }> }) {
  const {locale} = await paramsPromise;
  const t = await getTranslations({locale});

  return {
    title: `${t('mainMetaTitle')}`,
    description: `${t('mainMetaDescription')}`,
  };
}

export default async function MainPage() {
  const {products} = await getProducts();

  return (
    <>
      <BannerMain/>
      <NewProductsSlider products={products}/>
      <PartnersSlider/>
      <UniqMachinesSlider products={products}/>
      <OfflineOrOnlineMain/>
      <SimplerTabsMain/>
      <HitsProductsSlider products={products}/>
      <AboutMain/>
      <VideoReviews/>
      <ArticlesOnMain/>
    </>
  );
}
