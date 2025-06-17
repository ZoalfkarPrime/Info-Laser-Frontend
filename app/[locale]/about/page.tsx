import {AboutHeader} from "@/components/shared/about/AboutHeader";
import {AboutMain} from "@/components/shared/about/AboutMain";
import {SimplerTabsMain} from "@/components/shared/tabs/SimplerTabsMain";
import {AboutMap} from "@/components/shared/about/AboutMap";
import {SocialBanner} from "@/components/shared/banners/SocialBanner";
import {getTranslations} from "next-intl/server";
import {SocialBannerMini} from "@/components/shared/banners/SocialBannerMini";
import {Container} from "@/components/shared/Container";

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
      <div className={"max-md:hidden"}>
        <SocialBanner/>
      </div>
      <div className={"md:hidden max-md:block"}>
        <Container>
          <SocialBannerMini/>
        </Container>
      </div>
    </section>
  );
};

export default AboutPage;
