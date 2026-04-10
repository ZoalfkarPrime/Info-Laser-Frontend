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
import { readGroupedPageContentAsJsonByFilter } from "@/services/content.service";
import { HOME_PAGE_CONTENT } from "@/lib/variables";
import HeroSlider from "@/types/content/home/hero-slider";
import Partner from "@/types/content/home/partner";
import SocialMedia from "@/types/content/home/social-media";
import OfflineOrOnline from "@/types/content/home/online-offline";
import Promo from "@/types/content/home/promo";

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
  const homeContent = await readGroupedPageContentAsJsonByFilter({ page_id: String(HOME_PAGE_CONTENT.id) });

  return (
    <>
      <BannerMain sliders={homeContent[HOME_PAGE_CONTENT.heroSlider].map(HeroSlider.fromContentJson)} />
      <NewProductsSlider products={products} />
      <PartnersSlider partners={homeContent[HOME_PAGE_CONTENT.partners].map(Partner.fromContentJson)} />
      <UniqMachinesSlider products={products} />
      <OfflineOrOnlineMain
        content={OfflineOrOnline.fromContentJson(homeContent[HOME_PAGE_CONTENT.offlineOrOnline][0])}
        socialMedia={SocialMedia.fromContentJson(homeContent[HOME_PAGE_CONTENT.socialMedia][0])}
      />
      <SimplerTabsMain tabsData={homeContent[HOME_PAGE_CONTENT.promo].map(Promo.fromContentJson)} />
      <HitsProductsSlider products={products} />
      <AboutMain />
      <VideoReviews />
      <ArticlesOnMain />
    </>
  );
}
