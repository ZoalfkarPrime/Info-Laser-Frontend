import React from "react";
import {ClassName} from "@/types/types";
import {cn} from "@/lib/utils";
import {Container} from "@/components/shared/Container";
import {Logo} from "@/components/shared/Logo";
import {CircleCheck} from "lucide-react";

export const AboutMainList: React.FC<ClassName> = ({className}) => {

  const aboutList = [
    {
      name: "Поддержка",
      desc: "В Инфолазере вы получите отличную цену, мы поможем с организацией доставки и документационным сопровождением.",
    },
    {
      name: "Гарантия до 12 месяцев",
      desc: "Мы даем гарантию 12 месяцев на оборудование на территории всей России и странах СНГ.",
    },
    {
      name: "Большая база знаний",
      desc: "Более 100 статей на различные темы, которые отвечают на самые интересные и сложные вопросы общего характера.",
    }
  ];

  return (
    <section className={cn("py-7 max-md:py-0", className)}>
      <Container>
        <Container className={"max-w-[930px] text-center mb-10 max-md:mb-5"}>
          <Logo className={"flex justify-center mb-3"} name={"logo"}/>
          <h3 className={cn(
            "text-4xl font-semibold",
            "max-xl:text-3xl max-xl:mb-3",
            "max-md:text-2xl max-md:mb-2",
          )}>
            Компания Infolaser подберет и модернизирует станок с ЧПУ под ваши задачи.
            <span
              className={"text-[#9298AF] ml-1"}>Мы обучим ваш персонал и обеспечим тех. поддержку на каждом этапе.</span>
          </h3>
        </Container>

        <dl className={cn(
          "flex justify-between gap-x-5",
          "max-md:flex-col max-md:gap-x-0 max-md:gap-y-3",
        )}>
          {aboutList.map((item) => (
            <div key={item.name}>
              <dt className={"flex gap-x-2 font-semibold mb-2 max-md:mb-1"}>
                <CircleCheck className="shrink-0 text-white fill-[var(--violet)]" size={20}/>
                {item.name}
              </dt>
              <dd className={"pl-7 max-md:text-sm"}>{item.desc}</dd>
            </div>
          ))}
        </dl>

      </Container>
    </section>
  );
};
