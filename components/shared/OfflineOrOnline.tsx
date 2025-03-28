import {cn} from "@/lib/utils";
import React from "react";
import {ClassName} from "@/types/types";
import Image from "next/image";
import {Container} from "@/components/shared/Container";
import Link from "next/link";
import {DemoBtn} from "@/components/shared/btns/DemoBtn";

export const OfflineOrOnline: React.FC<ClassName> = ({className}) => {

  return (
    <section className={cn("py-7", className)}>
      <h2 className={"hidden"}>Демонстрация оборудования</h2>
      <Container>
        <div
          className={cn(
            'grid grid-cols-[auto_1fr_auto_auto] gap-10 items-center bg-gray-800 text-white rounded-4xl px-20 py-6',
            'max-lg:grid-cols-[1fr_1fr] max-lg:gap-8 max-lg:px-10',
            'max-md:grid-cols-[1fr_1fr] max-md:gap-4 max-md:px-3',
          )}
        >

          <Image
            src="/img/demo-bg/demo-laptop.png"
            width={670}
            height={485}
            alt="Demo"
            className=" flex justify-center md:max-w-[200px]"
          />

          <div>
            <p className={cn(
              'text-2xl font-semibold',
              'max-md:text-lg'
            )}>
              Offline или Online?
            </p>
            <p className={cn(
              'text-gray-300 leading-4.5 mt-2',
              'max-md:text-sm'
            )}>
              Продемонстрируем работу оборудования любым удобным способом: в более 50 городах России или по видеосвязи.
            </p>
          </div>

          <ul className={cn(
            "flex items-center gap-3",
            "max-md:justify-center"
          )}>
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

          <DemoBtn
            className={cn('text-gray-800 bg-gray-100 hover:bg-gray-300 focus:bg-gray-300 rounded-3xl transition-colors duration-300')}
            title={"Записаться на демонстрацию"}
          />

        </div>
      </Container>
    </section>
  );
};
