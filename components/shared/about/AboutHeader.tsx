import React from "react";
import {Container} from "@/components/shared/Container";
import {cn} from "@/lib/utils";

export const AboutHeader: React.FC = () => {
  return (
    <header className={cn(
      "relative min-h-[625px] mb-15 bg-[url('/img/about/about-header-bg.jpg')] bg-no-repeat bg-cover",
      "max-md:bg-[url('/img/about/about-header-bg-mobile.jpg')] max-md:mb-10",
    )}>
      <Container className={"relative z-30"}>
        <div className={"grid grid-cols-12"}>
          <div className={cn(
            "col-start-1 col-end-7 py-40",
            "max-md:col-span-full max-md:py-5 max-md:text-white"
          )}>
            <h1 className={cn(
              "text-5xl font-semibold mb-8",
              "max-xl:text-4xl max-xl:mb-5",
              "max-md:text-3xl max-md:mb-3",
            )}>
              О компании Infolaser
            </h1>
            <p className={"mb-5 max-md:text-sm"}>
              Компания Infolaser с 2009 года поставляет и обслуживает лазерное оборудование.
            </p>
          </div>
        </div>
      </Container>
    </header>
  );
};

