import Image from "next/image";
import {DemoBtn} from "@/components/shared/btns/DemoBtn";
import {cn} from "@/lib/utils";
import React from "react";
import Link from "next/link";
import {Container} from "@/components/shared/Container";
import {ClassName} from "@/types/types";

export const OfflineOrOnlineMain: React.FC<ClassName> = ({className}) => {
  return (
    <div className={cn("py-7", className)}>
      <Container>
        <div
          className="flex items-center justify-center bg-[url('/img/banners/bg/online-or-offline.jpg')] bg-no-repeat bg-cover rounded-4xl overflow-hidden py-13 px-5">
          <div className="text-center max-w-[600px]">
            <p className="text-3xl md:text-4xl font-bold mb-4">Online или Offline?</p>
            <p className="text-lg leading-6 mb-6">
              Продемонстрируем работу оборудования любым удобным способом: в более
              50 городах России или по видеосвязи.
            </p>
            <ul className="flex justify-center gap-4 mb-6">
              <li>
                <Link className={"hover:[&>img]:scale-[1.1] focus:[&>img]:scale-[1.1]"} href={"#"}>
                  <Image
                    className={"transition-transform duration-300"}
                    alt={"icon"}
                    src={"/img/icons/social/icon-tg.svg"}
                    height={28} width={28}
                  />
                </Link>
              </li>
              <li>
                <Link className={"hover:[&>img]:scale-[1.1] focus:[&>img]:scale-[1.1]"} href={"#"}>
                  <Image
                    className={"transition-transform duration-300"}
                    alt={"icon"}
                    src={"/img/icons/social/icon-whatsapp.svg"}
                    height={28} width={28}
                  />
                </Link>
              </li>
              <li>
                <Link className={"hover:[&>img]:scale-[1.1] focus:[&>img]:scale-[1.1]"} href={"#"}>
                  <Image
                    className={"transition-transform duration-300"}
                    alt={"icon"}
                    src={"/img/icons/social/icon-vk.svg"}
                    height={28} width={28}
                  />
                </Link>
              </li>
            </ul>
            <DemoBtn className={cn("rounded-3xl")} title={"Записаться на демонстрацию"}/>
          </div>
        </div>
      </Container>
    </div>
  );
}
