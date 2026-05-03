import { getProducts, getPartners } from "@/api/api";
import { BannerMain } from "@/components/shared/carousels/banners/BannerMain";
import { NewProductsSlider } from "@/components/shared/carousels/NewProductsSlider";
import { PartnersSlider } from "@/components/shared/carousels/PartnersSlider";
import { UniqMachinesSlider } from "@/components/shared/carousels/UniqMachinesSlider";
import { OfflineOrOnlineMain } from "@/components/shared/banners/OfflineOrOnlineMain";
import { AboutMain } from "@/components/shared/about/AboutMain";
import { ArticlesOnMain } from "@/components/shared/articles/ArticlesOnMain";
import { getTranslations } from "next-intl/server";
import { HitsProductsSlider } from "@/components/shared/carousels/HitsProductsSlider";
import { VideoReviews } from "@/components/shared/reviews/VideoReviews";
import { readContentAsJsonByFilter } from "@/services/content.service";
import { GLOBAL_CONTENT, HOME_PAGE_CONTENT, PROMO_BANNER } from "@/lib/variables";
import HeroSlider from "@/types/content/home/hero-slider";
import Promo from "@/types/content/global/promo";
import { SimplerTabsMain } from "@/components/shared/tabs/SimplerTabsMain";

export async function generateMetadata({ params: paramsPromise }: { params: Promise<{ locale: string }> }) {
  const { locale } = await paramsPromise;
  const t = await getTranslations({ locale });

  return {
    title: `${t('mainMetaTitle')}`,
    description: `${t('mainMetaDescription')}`,
  };
}

export default async function MainPage() {
  const { products } = await getProducts();
  const partners = await getPartners();
  const homeContent = await readContentAsJsonByFilter({ referenceType: "home", });
  const promoContent = await readContentAsJsonByFilter({
    referenceType: GLOBAL_CONTENT,
    section: PROMO_BANNER,
    title: HOME_PAGE_CONTENT.promoBannerTitle
  });
  const promoTabs = promoContent.filter(content => content.title === HOME_PAGE_CONTENT.promoBannerTitle).map(Promo.fromContentJson);

  const slidersJson = homeContent.filter(content => content.section === HOME_PAGE_CONTENT.heroSlider);
  const sliders = slidersJson.map(HeroSlider.fromContentJson);

  return (
    <>
      {
        sliders.length > 0 && (
          <BannerMain sliders={sliders} />
        )
      }
      {
        products.length > 0 && (
          <NewProductsSlider products={products} />
        )
      }
      {
        partners.length > 0 && (
          <PartnersSlider partners={partners} />
        )
      }
      {
        products.length > 0 && (
          <UniqMachinesSlider products={products} />
        )
      }
      <OfflineOrOnlineMain
        title={HOME_PAGE_CONTENT.bannerTitle}
      />
      {
        promoTabs.length > 0 && (
          <SimplerTabsMain tabsData={promoTabs} />
        )
      }
      {
        products.length > 0 && (
          <HitsProductsSlider products={products} />
        )
      }
      <AboutMain />
      <VideoReviews />
      <ArticlesOnMain />
    </>
  );
}