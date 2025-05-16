import {AboutHeader} from "@/components/shared/about/AboutHeader";
import {AboutMain} from "@/components/shared/about/AboutMain";
import {SimplerTabsMain} from "@/components/shared/SimplerTabsMain";
import {AboutMap} from "@/components/shared/about/AboutMap";
import {SocialBanner} from "@/components/shared/banners/SocialBanner";

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
