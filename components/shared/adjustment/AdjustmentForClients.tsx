import React from "react";
import {ClassName} from "@/types/types";
import {Container} from "@/components/shared/Container";
import {DemoBtn} from "@/components/shared/btns/DemoBtn";
import {cn} from "@/lib/utils";

interface AdjustmentForClientsProps extends ClassName {
  data: {
    id: number;
    name: string;
    price: number;
    second_price: number;
  }[]
}

export const AdjustmentForClients: React.FC<AdjustmentForClientsProps> = ({data, className}) => {
  return (

    <section className={cn("", className)}>
      <Container>
        <h2 className={"text-4xl font-semibold text-center mb-10"}>Пусконаладка оборудования для клиентов</h2>
        <div className={cn("bg-[var(--gray)] rounded-3xl p-5")}>
          <ul className={cn("flex flex-col mb-3")}>
            <li
              className={cn("grid grid-cols-12 auto-rows-auto items-center text-sm text-[var(--gray-text)] border-b border-b-gray-500 pb-5")}>

              <div className={"col-start-1 col-end-7"}>Вид работ</div>

              <div className={"col-start-7 col-end-10"}>Для клиентов компании Infolaser</div>

              <div className="col-start-10 col-end-12">Для сторонних клиентов</div>
            </li>

            {data.map((item) => (
              <li
                key={item.id}
                className={cn(
                  "grid grid-cols-12 auto-rows-auto items-center text-sm py-5 not-last:border-b border-b-gray-500",
                )}
              >

                <div className={"col-start-1 col-end-7"}>{item.name}</div>

                <div className={"col-start-7 col-end-10 font-semibold"}>от {item.price} руб.</div>

                <div className="col-start-10 col-end-12">от {item.second_price} руб.</div>
              </li>
            ))}
          </ul>

          <div className={"flex justify-between items-center bg-white rounded-4xl p-5"}>
            <div>
              <p className={"font-semibold text-xl mb-2"}>Оформить заявку на сервис</p>
              <p className={"text-sm text-[var(--gray-text)]"}>
                За 10 лет работы мы накопили много знаний и практического опыта работы с самыми различными моделями
                лазерного оборудования.
              </p>
            </div>
            <DemoBtn className={"rounded-3xl"} title={"Заявка на сервис"}/>
          </div>
        </div>
      </Container>
    </section>

  );
}
