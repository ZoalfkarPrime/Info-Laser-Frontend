import React from "react";
import {ClassName} from "@/types/types";
import {Container} from "@/components/shared/Container";
import {DemoBtn} from "@/components/shared/btns/DemoBtn";
import Image from "next/image";

export const AdjustmentHeader: React.FC<ClassName> = () => {
  return (

    <header className={"relative min-h-[625px] mb-15"}>
      <Image
        src="/img/adjustment/adjustment-bg.jpg"
        alt="Пусконаладка оборудования"
        fill
        className="absolute object-cover object-center z-0"
        priority
      />
      <Container className={"relative z-30"}>
        <div className={"grid grid-cols-12"}>
          <div className={"col-start-1 col-end-7 py-20"}>
            <h1 className={"text-5xl font-semibold mb-8"}>Пусконаладка оборудования</h1>
            <p className={"mb-5"}>Сервис нашей компании помогает клиентам уже почти 10 лет. За это время мы
              накопили много знаний и
              практического опыта работы с самыми различными моделями лазерного оборудования.
            </p>
            <DemoBtn className={"rounded-3xl"} title={"Заявка на сервис"}/>
          </div>
        </div>
      </Container>
    </header>

  );
}
