'use client'

import {Container} from "@/components/shared/Container";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/Carousel";
import React from "react";
import {cn} from "@/lib/utils";
import {ClassName} from "@/types/types";
import Image from "next/image";
import {CarouselDots} from "@/components/shared/carousels/CarouselDots";

export const PartnersSlider: React.FC<ClassName> = ({className}) => {

  const partners = [
    {
      id: "1",
      name: "wattsan",
      imageUrl: "https://wattsan.com/wp-content/uploads/wattsan_logo-1.svg"
    },
    {
      id: "6",
      name: "reci",
      imageUrl: "https://infolaser.ru/img/logos/reci.svg"
    },
    {
      id: "4",
      name: "lasea",
      imageUrl: "https://infolaser.ru/img/logos/lasea.svg"
    },

    {
      id: "3",
      name: "s_and_a",
      imageUrl: "https://infolaser.ru/img/logos/s_and_a.svg"
    },
    {
      id: "2",
      name: "king_rabbit",
      imageUrl: "https://infolaser.ru/img/logos/king_rabbit.svg"
    },

    {
      id: "5",
      name: "yongli",
      imageUrl: "https://infolaser.ru/img/logos/yongli.svg"
    },


    {
      id: "7",
      name: "hiwin",
      imageUrl: "https://infolaser.ru/img/logos/hiwin.svg"
    },
    {
      id: "8",
      name: "leadshine",
      imageUrl: "https://infolaser.ru/img/logos/leadshine.svg"
    },
    {
      id: "9",
      name: "rj",
      imageUrl: "https://infolaser.ru/img/logos/rj.svg"
    },
    {
      id: "10",
      name: "Ruida",
      imageUrl: "https://infolaser.ru/img/logos/Ruida.svg"
    }
  ];

  return (
    <section className={cn('py-7 mb-5', className)}>
      <Container>
        <h2
          className={cn(
            "text-2xl font-bold text-center mb-5",
            "max-md:text-xl"
          )}
        >
          Партнерские отношения с крупными брендами сферы ЧПУ
        </h2>

        <Carousel
          className={""}
          opts={{
            align: "start",
          }}
        >
          <CarouselContent className="items-center p-5 -ml-5 max-sm:-ml-2 ">
            {partners.map((partner) => (
              <CarouselItem
                key={partner.id}
                className={cn(
                  'basis-1/6 pl-5 max-2xl:basis-1/4',
                  ' max-lg:basis-1/2',
                  ' max-md:basis-[55%]',
                )}
              >
                <Image
                  src={partner.imageUrl}
                  alt={partner.name}
                  width={200}
                  height={75}
                  className={cn(
                    "max-w-[200px] max-h-[75px]",
                    "max-md:max-w-[150px] max-md:max-h-[60px]",
                  )}
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className={cn('-left-[20px] max-xl:left-[10px]', className)}/>
          <CarouselNext className={cn('-right-[20px] max-xl:right-[10px]', className)}/>

          <CarouselDots className="absolute -bottom-5 left-0 right-0"/>
        </Carousel>
      </Container>
    </section>
  );
};
