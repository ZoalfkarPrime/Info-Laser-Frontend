import React from "react";
import Image from "next/image";
import {Container} from "@/components/shared/Container";

export const AboutHeader: React.FC = () => {
  return (
    <header className={"relative min-h-[625px] mb-15"}>
      <Image
        src="/img/about/about-header-bg.jpg"
        alt="О компании Infolaser"
        fill
        className="absolute object-cover object-center z-0"
        priority
      />

      <Container className={"relative z-30"}>
        <div className={"grid grid-cols-12"}>
          <div className={"col-start-1 col-end-7 py-40"}>
            <h1 className={"text-5xl font-semibold mb-8"}>О компании Infolaser</h1>
            <p className={"mb-5"}>
              Компания Infolaser с 2009 года поставляет и обслуживает лазерное оборудование.
            </p>
          </div>
        </div>
      </Container>
    </header>
  );
};

