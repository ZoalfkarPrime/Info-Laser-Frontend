import React from "react";
import {Container} from "@/components/shared/Container";
import {ClassName} from "@/types/types";
import {cn} from "@/lib/utils";
import Image from "next/image";

export const AboutMap: React.FC<ClassName> = ({className}) => {
  return (
    <section className={cn("py-10", className)}>
      <Container>
        <div className={"text-center max-w-[720px] mx-auto mb-5"}>
          <h2 className={"text-4xl font-semibold mb-5"}>География присутствия</h2>
          <p className={"text-sm"}>
            Производим поставки лазерного оборудование во все города России, такие, как Москва, Санкт-Петербург,
            Новосибирск, Екатеринбург, Нижний Новгород, Казань, Самара, Омск, Челябинск, Ростов-на-Дону, Уфа, Волгоград,
            Красноярск, Пермь, Воронеж и т.д.
          </p>
        </div>

        <Image
          src="/img/about/about-map.jpg"
          alt="Карта присутствия Infolaser"
          width={1920}
          height={670}
          priority
        />
      </Container>
    </section>
  );
};
