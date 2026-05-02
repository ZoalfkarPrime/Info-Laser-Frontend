import { getProducts } from "@/api/api";
import { BannerMain } from "@/components/shared/carousels/banners/BannerMain";
import { NewProductsSlider } from "@/components/shared/carousels/NewProductsSlider";
import { PartnersSlider } from "@/components/shared/carousels/PartnersSlider";
import { UniqMachinesSlider } from "@/components/shared/carousels/UniqMachinesSlider";
import { OfflineOrOnlineMain } from "@/components/shared/banners/OfflineOrOnlineMain";
import { SimplerTabsMain } from "@/components/shared/tabs/SimplerTabsMain";
import { AboutMain } from "@/components/shared/about/AboutMain";
import { ArticlesOnMain } from "@/components/shared/articles/ArticlesOnMain";
import { getTranslations } from "next-intl/server";
import { HitsProductsSlider } from "@/components/shared/carousels/HitsProductsSlider";
import { VideoReviews } from "@/components/shared/reviews/VideoReviews";
import { readContentAsJsonByFilter } from "@/services/content.service";
import { HOME_PAGE_CONTENT } from "@/lib/variables";
import CentralBanner from "@/types/content/home/central-banner";
import HeroSlider from "@/types/content/home/hero-slider";
import Partner from "@/types/content/home/partner";
import SocialMedia from "@/types/content/home/social-media";
import OfflineOrOnline from "@/types/content/home/online-offline";
import Promo from "@/types/content/home/promo";
import WhyChooseInfolaser from "@/types/content/home/why-choose-infolaser";

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
  const homeContent = await readContentAsJsonByFilter({ referenceType: "home" });

  const slidersJson = homeContent.filter(content => content.section === HOME_PAGE_CONTENT.heroSlider);
  const sliders = slidersJson.map(HeroSlider.fromContentJson);

  const centralBannerJson = homeContent.find(content => content.section === HOME_PAGE_CONTENT.centralBanner);
  const centralBanner = centralBannerJson ? CentralBanner.fromContentJson(centralBannerJson) : undefined;

  const whyChooseInfolaserJson = homeContent.find(content => content.section === HOME_PAGE_CONTENT.whyChooseInfolaser);
  const whyChooseInfolaser = whyChooseInfolaserJson ? WhyChooseInfolaser.fromContentJson(whyChooseInfolaserJson) : undefined;

  return (
    <>
      <BannerMain sliders={sliders} />
      <NewProductsSlider products={products} />
      {/* <PartnersSlider partners={homeContent[HOME_PAGE_CONTENT.partners].map(Partner.fromContentJson)} /> */}
      <UniqMachinesSlider products={products} />
      <OfflineOrOnlineMain
        content={centralBanner}
      />
      {/* <SimplerTabsMain tabsData={homeContent[HOME_PAGE_CONTENT.promo].map(Promo.fromContentJson)} /> */}
      <HitsProductsSlider products={products} />
      <AboutMain whyChooseInfolaser={whyChooseInfolaser} />
      <VideoReviews />
      <ArticlesOnMain />
    </>
  );
}