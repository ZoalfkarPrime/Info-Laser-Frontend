import Image from "next/image";
import {DemoBtn} from "@/components/shared/btns/Demo-btn";
import {cn} from "@/lib/utils";
import React from "react";
import Link from "next/link";
import {Container} from "@/components/shared/Container";

export default function OfflineOrOnlineMain() {
  return (
    <div className={"py-7"}>
      <Container>
        <div
          className="flex items-center bg-[url('/img/demo-bg/demo-bg.jpg')] bg-no-repeat bg-cover rounded-4xl px-5 overflow-hidden">
          <Image
            src="/img/demo-bg/demo-lap-1.png"
            alt="Laser Machine"
            width={430}
            height={300}
            className={"self-end"}
          />
          <div className="text-center py-5">
            <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Online или Offline?</p>
            <p className="text-gray-700 text-lg leading-6 mb-6">
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
          <Image
            src="/img/demo-bg/demo-lap-2.png"
            alt="Laser Machine"
            width={430}
            height={300}
            className={"relative right-[-100px] bottom-[-85px] self-end"}
          />
        </div>
      </Container>
    </div>
  );
}
