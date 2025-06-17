import {cn} from "@/lib/utils";
import React from "react";
import {ClassName} from "@/types/types";
import {AboutMainList} from "@/components/shared/about/AboutMainList";
import {AboutMainMarquee} from "@/components/shared/about/AboutMainMarquee";

export const AboutMain: React.FC<ClassName> = ({className}) => {
  return (
    <section className={cn("py-7 max-md:py-0", className)}>
      <h2 className={"hidden"}>О компании</h2>
      <AboutMainList/>
      <AboutMainMarquee/>
    </section>
  );
}
