import React from "react";
import {ClassName} from "@/types/types";
import {Container} from "@/components/shared/Container";
import {DemoBtn} from "@/components/shared/btns/DemoBtn";
import {cn} from "@/lib/utils";

export const AdjustmentHeader: React.FC<ClassName> = () => {
  return (
    <header className={cn(
      "relative min-h-[625px] mb-15 bg-[url('/img/adjustment/adjustment-header-bg.jpg')] bg-no-repeat bg-cover",
      "max-md:bg-[url('/img/adjustment/adjustment-header-bg-mobile.jpg')] max-md:mb-5",
    )}>
      <Container className={"relative z-30"}>
        <div className={"grid grid-cols-12"}>
          <div className={cn(
            "col-start-1 col-end-7 py-20",
            "max-md:col-span-full max-md:py-5",
          )}>
            <h1 className={cn(
              "text-5xl font-semibold mb-8",
              "max-xl:text-4xl max-xl:mb-5",
              "max-md:text-3xl",
            )}>
              Пусконаладка оборудования
            </h1>
            <p className={"mb-5 max-md:text-sm"}>Сервис нашей компании помогает клиентам уже почти 10 лет. За это время
              мы накопили много знаний и практического опыта работы с самыми различными моделями лазерного оборудования.
            </p>
            <DemoBtn title={"Заявка на сервис"}/>
          </div>
        </div>
      </Container>
    </header>
  );
}
