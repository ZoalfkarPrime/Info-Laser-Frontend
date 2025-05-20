import {AboutHeader} from "@/components/shared/about/AboutHeader";
import {AboutMain} from "@/components/shared/about/AboutMain";
import {SimplerTabsMain} from "@/components/shared/SimplerTabsMain";
import {AboutMap} from "@/components/shared/about/AboutMap";
import {SocialBanner} from "@/components/shared/banners/SocialBanner";
import {getTranslations} from "next-intl/server";

export async function generateMetadata({params: paramsPromise}: { params: Promise<{ locale: string }> }) {
  const {locale} = await paramsPromise;
  const t = await getTranslations({locale});

  return {
    title: `${t('aboutMetaTitle')}`,
    description: `${t('aboutMetaDescription')}`,
  };
}

const AboutPage = () => {

  return (
    <section>
      <AboutHeader/>
      <AboutMain/>
      <SimplerTabsMain/>
      <AboutMap/>
      <SocialBanner/>
    </section>
  );
};

export default AboutPage;
