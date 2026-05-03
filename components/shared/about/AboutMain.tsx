import { cn } from "@/lib/utils";
import React from "react";
import { ClassName } from "@/types/types";
import { AboutMainList } from "@/components/shared/about/AboutMainList";
import { AboutMainMarquee } from "@/components/shared/about/AboutMainMarquee";
import WhyChooseInfolaser from "@/types/content/home/why-choose-infolaser";
import { readContentAsJsonByFilter } from "@/services/content.service";
import { HOME_PAGE_CONTENT } from "@/lib/variables";

interface Props extends ClassName {
}

export const AboutMain: React.FC<Props> = async ({ className }) => {

  const content = await readContentAsJsonByFilter({ referenceType: "home", section: HOME_PAGE_CONTENT.whyChooseInfolaser });

  const whyChooseInfolaserJson = content.find(content => content.section === HOME_PAGE_CONTENT.whyChooseInfolaser);
  const whyChooseInfolaser = whyChooseInfolaserJson ? WhyChooseInfolaser.fromContentJson(whyChooseInfolaserJson) : undefined;
  return (
    <section className={cn("py-7 max-md:py-0", className)}>
      <h2 className={"hidden"}>О компании</h2>
      <AboutMainList whyChooseInfolaser={whyChooseInfolaser} />
      <AboutMainMarquee />
    </section>
  );
}
