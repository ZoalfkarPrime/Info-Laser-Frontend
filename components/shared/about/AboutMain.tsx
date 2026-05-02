import {cn} from "@/lib/utils";
import React from "react";
import {ClassName} from "@/types/types";
import {AboutMainList} from "@/components/shared/about/AboutMainList";
import {AboutMainMarquee} from "@/components/shared/about/AboutMainMarquee";
import WhyChooseInfolaser from "@/types/content/home/why-choose-infolaser";

interface Props extends ClassName {
  whyChooseInfolaser?: WhyChooseInfolaser;
}

export const AboutMain: React.FC<Props> = ({className, whyChooseInfolaser}) => {
  return (
    <section className={cn("py-7 max-md:py-0", className)}>
      <h2 className={"hidden"}>О компании</h2>
      <AboutMainList whyChooseInfolaser={whyChooseInfolaser} />
      <AboutMainMarquee/>
    </section>
  );
}
