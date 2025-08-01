'use client'

import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,} from "@/components/ui/Carousel"
import Image from "next/image";
import {CarouselDots} from "@/components/shared/carousels/CarouselDots";
import React from "react";
import {DemoBtn} from "@/components/shared/btns/DemoBtn";
// import Autoplay from "embla-carousel-autoplay";

export const BannerMain = () => {

  const data = [
    {
      id: 1,
      name: 'banner-1',
      img_url_desc: '/img/banners/main-banner/main-banner.jpg',
      width: 1920,
      height: 600,
      img_url_mobile: '/img/banners/main-banner/main-banner-mobile.jpg',
      width_mobile: 642,
      height_mobile: 900
    },
    {
      id: 2,
      name: 'banner-2',
      img_url_desc: '/img/banners/main-banner/main-banner.jpg',
      width: 1920,
      height: 600,
      img_url_mobile: '/img/banners/main-banner/main-banner-mobile.jpg',
      width_mobile: 642,
      height_mobile: 900
    }
  ]

  return (
    <section className="mb-5">
      <h2 className="hidden">Основные акции и новости компании</h2>
      <Carousel
        className=""
        opts={{
          loop: true,
        }}
        // plugins={[
        //   Autoplay({
        //     delay: 3000,
        //   }),
        // ]}
      >
        <CarouselContent>
          {data.map((item) => {
            return (
              <CarouselItem key={item.id}>
                <DemoBtn
                  title={""}
                  className={"absolute w-full h-full bg-inherit/0 hover:bg-inherit/0 focus:bg-inherit/0"}
                />
                <Image
                  src={item.img_url_desc}
                  width={item.width}
                  height={item.height}
                  alt={item.name}
                  className="max-h-[600px] w-full object-cover max-[650px]:hidden"
                />
                <Image
                  src={item.img_url_mobile}
                  width={item.width}
                  height={item.height}
                  alt={item.name}
                  className="max-h-[600px] w-full object-fill min-[650px]:hidden"
                />
              </CarouselItem>
            )
          })}
        </CarouselContent>
        <CarouselPrevious className="left-3"/>
        <CarouselNext className="right-3"/>
        <CarouselDots className="absolute bottom-4 left-0 right-0"/>
      </Carousel>
    </section>
  );
};
