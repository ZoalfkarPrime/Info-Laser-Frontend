"use client";

import {Container} from "@/components/shared/Container";
import {cn} from "@/lib/utils";
import React from "react";
import {ClassName} from "@/types/types";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/Carousel";
import {CarouselDots} from "@/components/shared/carousels/CarouselDots";
import Image from "next/image";
import {Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger} from "@/components/ui/Dialog";
import {Button} from "@/components/ui/Button";

export interface Letter {
  id: number;
  title: string;
  name: string;
  text: string;
  brandImg: string;
  brandScan: string;
}

export const LetterOfThanks: React.FC<ClassName> = ({className}) => {

  const data: Letter[] = [
    {
      id: 1,
      title: 'Архитектура и инженерия',
      name: 'Свой стиль',
      text: 'Благодарственное письмо ООО Компания Свой Стиль выражает свою благодарность коллективу компании ООО "Инфотрейд", за проявленный профессионализм и качество выполненных работ по поставке и пуско-наладочным работам оборудования Wattsan Мы можем рекомендовать ООО "Инфотрейд" как ответственного и надежного партнера и надеемся на дальнейшее взаимовыгодное сотрудничество. Генеральный директор Стулов И.В.',
      brandImg: '/img/letters/brands/style-1.jpg',
      brandScan: '/img/letters/brands/style-1.jpg'
    },
    {
      id: 2,
      title: 'Стройматериалы',
      name: 'ООО «ЭМИЛАР»',
      text: 'Благодарственное письмо 000 «ЭМИЛАР» свидетельствует Вам свое почтение и выражает благодарность компании ООО «Инфотрейд», за своевременную поставку лазерного оборудования, запуск и обучение персонала. Мы уверены, работая с Вами, мы создаем прочную основу для прибыльного, взаимовыгодного бизнеса. С уважением, Генеральный директор. Лорин О.',
      brandImg: '/img/letters/brands/emilar-2.jpg',
      brandScan: '/img/letters/brands/emilar-2.jpg'
    },
    {
      id: 3,
      title: 'Стройматериалы',
      name: 'ИП Касатнин А.А.',
      text: 'Благодарственное письмо ИП Касетнин Александр Андреевич выражает свою благодарность коллективу компании 000 “Инфотрейд”, за оперативно проявленную профессиональную поддержку и поставку комплектующих для оборудования КОМАСН. Я могу рекомендовать компанию ООО "Инфотрейд" как надежного партнера и надеется на дальнейшее вззимовьгодное сотрудничество.',
      brandImg: '/img/letters/brands/kasatkin-3.jpg',
      brandScan: '/img/letters/brands/kasatkin-3.jpg'
    },
    {
      id: 4,
      title: 'Грузоперевозки',
      name: 'ООО "Северное Сияние"',
      text: 'Благодарственное письмо ООО ООО "Северное Сияние" выражает свою благодарность коллективу компании ООО “Инфотрейд” за профессионализм и качество в выполнении наладочных работ оборудования КОМАСН. Генеральный Директор Харлов И.И',
      brandImg: '/img/letters/brands/northern-lights-4.jpg',
      brandScan: '/img/letters/brands/northern-lights-4.jpg'
    },
    {
      id: 5,
      title: 'Производитель коммутационной техники',
      name: 'OOO «Вайдиюллер»',
      text: 'Благодарственное письмо Компания Weidmueller свидетельствует Вам свое почтение ивыражает благодарность компании ООО "Инфотрейд", за своевременную поставку лазерного оборудования, запуск и обучение персонала. С уважением, Менеджер проектов. Корешков Н.С.',
      brandImg: '/img/letters/brands/widiyuller-5.jpg',
      brandScan: '/img/letters/brands/widiyuller-5.jpg'
    },
  ]

  return (
    <section className={cn(
      "py-20 mb-10",
      "max-xl:overflow-hidden max-xl:pt-10",
      "max-md:pt-5 max-md:pb-18",
      className
    )}>
      <Container>
        <h2 className={cn(
          "text-4xl font-semibold mb-10",
          "max-xl:text-3xl max-xl:mb-5",
          "max-md:text-2xl max-md:mb-3"
        )}
        >
          Благодарственные письма
        </h2>

        <Carousel className={cn("max-xl:[&>div]:overflow-visible")} opts={{align: "start"}}>
          <CarouselContent className={cn(
            "-ml-5",
            "max-md:-ml-2"
          )}>
            {data.map((item) => (
              <CarouselItem
                key={item.id}
                className={cn(
                  "basis-1/2 pl-5",
                  "max-xl:basis-[75%]",
                  "max-md:basis-[85%] max-md:pl-2",
                )}
              >
                <div className={cn(
                  "grid grid-cols-12 bg-[var(--gray)] h-full p-7 overflow-hidden rounded-3xl",
                  "max-md:p-2 max-xl:gap-y-2"
                )}>

                  <div className={cn(
                    "col-start-1 col-end-10",
                    "max-xl:col-span-full"
                  )}>
                    <p className={cn(
                      "text-sm text-[var(--gray-text)] mb-2",
                      "max-md:text-sm max-md:mb-1"
                    )}>
                      {item.title}
                    </p>
                    <p className={cn(
                      "text-xl font-semibold mb-2",
                      "max-md:text-lg max-md:mb-1"
                    )}>
                      {item.name}
                    </p>
                  </div>

                  <div className={cn(
                    "col-start-10 col-end-13 row-start-1 row-end-3 min-w-[150px]",
                    "max-xl:col-span-full max-xl:row-auto max-xl:flex max-xl:gap-x-3"
                  )}>
                    <div className="relative overflow-hidden mb-5 max-md:mb-0">
                      <div className={cn(
                        "absolute left-2 bottom-2 w-[35px] h-[35px] bg-[url('/img/icons/quotes.svg')] bg-no-repeat bg-center z-30",
                        "max-xl:bg-size-[60%] max-xl:left-0 max-xl:bottom-0",
                      )}
                      />

                      <Image
                        className={cn(
                          "rounded-tl-full rounded-tr-full rounded-br-full max-w-[150px]",
                          "max-xl:max-w-[60px]",
                          "relative z-10"
                        )}
                        src={item.brandImg}
                        alt={item.title}
                        width={150}
                        height={150}
                      />
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className={"max-xl:self-start"} variant={"violetOutline"}>
                          Посмотреть скан
                        </Button>
                      </DialogTrigger>
                      <DialogDescription className="hidden"></DialogDescription>
                      <DialogContent>
                        <DialogTitle className={"text-3xl max-md:text-2xl"}>Скан письма</DialogTitle>
                        <div>
                          <Image src={item.brandScan} alt={item.title} width={500} height={500}/>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <p className={cn(
                    "grid col-start-1 col-end-10 text-sm",
                    "xl:pr-5",
                    "max-md:text-xs max-xl:col-span-full"
                  )}>
                    {item.text}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className={cn(
            "-left-[40px]",
            "max-xl:left-[20px]",
            "max-md:left-[10px]",
            className
          )}/>
          <CarouselNext className={cn(
            "-right-[40px]",
            "max-xl:right-[20px]",
            "max-md:right-[10px]",
            className
          )}/>
          <CarouselDots className="absolute -bottom-13 left-0 right-0"/>
        </Carousel>
      </Container>
    </section>
  );
};
