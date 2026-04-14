'use client'

import { Container } from "@/components/shared/Container";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/Carousel";
import React from "react";
import { cn } from "@/lib/utils";
import { ClassName } from "@/types/types";
import Image from "next/image";
import { CarouselDots } from "@/components/shared/carousels/CarouselDots";
import Partner from "@/types/content/home/partner";

export const PartnersSlider: React.FC<ClassName & { partners: Partner[] }> = ({ className, partners }) => {

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
            {partners?.filter((partner) => partner.mainImg).map((partner) => (
              <CarouselItem
                key={partner.id}
                className={cn(
                  'basis-1/6 pl-5 max-2xl:basis-1/4',
                  ' max-lg:basis-1/2',
                  ' max-md:basis-[55%]',
                )}
              >
                <Image
                  src={partner.mainImg ?? ''}
                  alt={partner.mainImg ?? ''}
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

          <CarouselPrevious className={cn('-left-[20px] max-xl:left-[10px]', className)} />
          <CarouselNext className={cn('-right-[20px] max-xl:right-[10px]', className)} />

          <CarouselDots className="absolute -bottom-5 left-0 right-0" />
        </Carousel>
      </Container>
    </section>
  );
};
