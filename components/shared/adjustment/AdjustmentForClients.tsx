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
        <h2 className={cn(
          "text-4xl font-semibold text-center mb-10",
          "max-xl:text-3xl max-xl:mb-5",
          "max-md:text-2xl",
        )}>
          Пусконаладка оборудования для клиентов
        </h2>
        <div className={cn("bg-[var(--gray)] rounded-3xl p-5")}>
          <ul className={cn("flex flex-col mb-3")}>
            <li
              className={cn(
                "grid grid-cols-12 auto-rows-auto items-center text-sm text-[var(--gray-text)] border-b border-b-gray-500 pb-5",
                "max-md:text-xs max-md:gap-x-2"
              )}>
              <div className={"col-start-1 col-end-7"}>Вид работ</div>
              <div className={"col-start-7 col-end-10"}>Для клиентов компании Infolaser</div>
              <div className="col-start-10 col-end-12">Для сторонних клиентов</div>
            </li>

            {data.map((item) => (
              <li
                key={item.id}
                className={cn(
                  "grid grid-cols-12 auto-rows-auto items-center text-sm py-5 not-last:border-b border-b-gray-500",
                  "max-md:text-xs max-md:gap-x-2"
                )}
              >
                <div className={"col-start-1 col-end-7"}>{item.name}</div>
                <div className={"col-start-7 col-end-10 font-semibold"}>от {item.price} руб.</div>
                <div className="col-start-10 col-end-12">от {item.second_price} руб.</div>
              </li>
            ))}
          </ul>

          <div className={cn(
            "flex justify-between items-center bg-white rounded-4xl p-5",
            "max-md:flex-col max-md:items-start max-md:gap-y-3 max-md:p-3 max-md:rounded-2xl"
          )}>
            <div>
              <p className={cn(
                "font-semibold text-xl mb-2",
                "max-md:text-lg"
              )}>
                Оформить заявку на сервис
              </p>
              <p className={cn("text-sm text-[var(--gray-text)]")}>
                За 10 лет работы мы накопили много знаний и практического опыта работы с самыми различными моделями
                лазерного оборудования.
              </p>
            </div>
            <DemoBtn title={"Заявка на сервис"}/>
          </div>
        </div>
      </Container>
    </section>
  );
}
