import {DemoBtn} from "@/components/shared/btns/DemoBtn";
import {cn} from "@/lib/utils";
import React from "react";
import {Container} from "@/components/shared/Container";
import {ClassName} from "@/types/types";
import {SocialList} from "@/components/shared/social/SocialList";

export const OfflineOrOnlineMain: React.FC<ClassName> = ({className}) => {
  return (
    <div className={cn("py-7", className)}>
      <Container>
        <div
          className={cn(
            "flex items-center justify-center bg-[url('/img/banners/bg/online-or-offline.jpg')] bg-no-repeat bg-cover rounded-4xl overflow-hidden py-13 px-5",
            "max-xl:bg-center",
            "max-md:bg-[url('/img/banners/bg/online-or-offline-mini-mobile.jpg')] max-md:py-8"
          )}>
          <div className="text-center max-w-[600px]">
            <p className={cn(
              "text-3xl md:text-4xl font-bold mb-4",
              "max-md:text-2xl max-md:mb-3"
            )}>
              Online или Offline?
            </p>
            <p className={cn(
              "text-lg leading-6 mb-6",
              "max-md:text-xs max-md:leading-4 max-md:mb-3"
            )}>
              Продемонстрируем работу оборудования любым удобным способом: в более
              50 городах России или по видеосвязи.
            </p>
            <SocialList className={"justify-center mb-6 max-md:mb-3"}/>
            <DemoBtn className={cn("rounded-3xl")} title={"Записаться на демонстрацию"}/>
          </div>
        </div>
      </Container>
    </div>
  );
}
