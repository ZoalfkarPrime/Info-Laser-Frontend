import { AboutHeader } from "@/components/shared/about/AboutHeader";
import { AboutMain } from "@/components/shared/about/AboutMain";
import { AboutMap } from "@/components/shared/about/AboutMap";
import { SocialBanner } from "@/components/shared/banners/SocialBanner";
import { getTranslations } from "next-intl/server";
import { SocialBannerMini } from "@/components/shared/banners/SocialBannerMini";
import { Container } from "@/components/shared/Container";
import { SimplerTabsMain } from "@/components/shared/tabs/SimplerTabsMain";
import { readContentAsJsonByFilter } from "@/services/content.service";
import { ABOUT_PAGE_CONTENT, GLOBAL_CONTENT, PROMO_BANNER } from "@/lib/variables";
import Promo from "@/types/content/global/promo";

export async function generateMetadata({ params: paramsPromise }: { params: Promise<{ locale: string }> }) {
  const { locale } = await paramsPromise;
  const t = await getTranslations({ locale });

  return {
    title: `${t('aboutMetaTitle')}`,
    description: `${t('aboutMetaDescription')}`,
  };
}

const AboutPage = async () => {
  const promoContent = await readContentAsJsonByFilter({
    referenceType: GLOBAL_CONTENT,
    section: PROMO_BANNER,
    title: ABOUT_PAGE_CONTENT.promoBannerTitle
  });
  const promoTabs = promoContent.filter((content) => content.title === ABOUT_PAGE_CONTENT.promoBannerTitle).map(Promo.fromContentJson);

  return (
    <section>
      <AboutHeader />
      <AboutMain />
      {
        promoTabs.length > 0 && (
          <SimplerTabsMain tabsData={promoTabs} />
        )
      }
      <AboutMap />
      <div className={"max-md:hidden"}>
        <SocialBanner title={ABOUT_PAGE_CONTENT.socialBannerTitle} />
      </div>
      <div className={"md:hidden max-md:block"}>
        <Container>
          <SocialBannerMini title={ABOUT_PAGE_CONTENT.socialBannerTitle} />
        </Container>
      </div>
    </section>
  );
};

export default AboutPage;
