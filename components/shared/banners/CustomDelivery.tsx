import {cn} from "@/lib/utils";
import React from "react";
import {Container} from "@/components/shared/Container";
import {ClassName} from "@/types/types";
import {CallbackBtn} from "@/components/shared/btns/CallbackBtn";

export const CustomDelivery: React.FC<ClassName> = ({className}) => {
  return (
    <div className={cn("py-7", className)}>
      <Container>
        <div
          className={cn(
            "flex items-center justify-center bg-[url('/img/banners/bg/custom-delivery.jpg')] bg-no-repeat bg-cover rounded-4xl overflow-hidden py-8 px-5",
            "max-xl:bg-center",
            "max-md:bg-[url('/img/banners/bg/custom-delivery-mobile.jpg')] max-md:py-8"
          )}>
          <div className="text-center max-w-[450px]">
            <p className={cn(
              "text-3xl md:text-4xl font-bold mb-4",
              "max-md:text-2xl max-md:mb-3"
            )}>
              Поставка под заказ
            </p>
            <p className={cn(
              "text-lg leading-6 mb-6",
              "max-md:text-xs max-md:leading-4 max-md:mb-3"
            )}>
              Предварительная оплата 50%, остальная оплата после поступления заказа
            </p>
            <CallbackBtn variant={"violet"} title={"Узнать больше"}/>
          </div>
        </div>
      </Container>
    </div>
  );
}
