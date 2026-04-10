'use client'

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, } from "@/components/ui/Carousel"
import Image from "next/image";
import { CarouselDots } from "@/components/shared/carousels/CarouselDots";
import React from "react";
import { DemoBtn } from "@/components/shared/btns/DemoBtn";
import HeroSlider from "@/types/content/home/hero-slider";
import { normalizeHtml } from "@/lib/utils";
// import Autoplay from "embla-carousel-autoplay";

export const BannerMain = ({ sliders }: { sliders: HeroSlider[] }) => {
  const highlightWords = (text: string) => {
    const words = ['ONLINE', 'OFFLINE'];
    const regex = new RegExp(`(${words.join('|')})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) =>
      words.includes(part.toUpperCase()) ? (
        <span key={index} className="text-violet">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <section className="mb-10">
      <h2 className="hidden">Основные акции и новости компании</h2>
      <Carousel
        className="w-full"
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {sliders.map((item) => (
            <CarouselItem key={item.id}>
              <div
                className="relative overflow-hidden min-h-[500px] lg:min-h-[600px] flex items-center"
                style={{
                  background: 'linear-gradient(180deg, #eae7f7 0%, #f8f9fd 100%)',
                }}
              >
                {/* Subtle Dot Pattern Background Overlay (Optional/Decorative) */}
                <div className="absolute inset-0 opacity-10 pointer-events-none"
                  style={{ backgroundImage: 'radial-gradient(#abb4d7 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

                <div className="container mx-auto px-4 relative z-10">
                  <div className="flex flex-col lg:flex-row items-center justify-between gap-10">

                    {/* Left Content */}
                    <div className="flex-1 text-center lg:text-left max-w-[650px] py-10 lg:py-0 flex flex-col items-center lg:items-start">
                      {item.subTitleAbove && (
                        <p className="text-violet font-semibold text-base lg:text-lg mb-4 uppercase tracking-wide">
                          {normalizeHtml(item.subTitleAbove)}
                        </p>
                      )}

                      <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6 text-black px-4 lg:px-0">
                        {item.mainTitle ? highlightWords(normalizeHtml(item.mainTitle)) : ''}
                      </h1>

                      {item.subTitleBelow && (
                        <p className="text-base lg:text-xl text-black/80 mb-8 max-w-[500px] px-4 lg:px-0">
                          {normalizeHtml(item.subTitleBelow)}
                        </p>
                      )}

                      {item.btnText && (
                        <DemoBtn
                          title={normalizeHtml(item.btnText)}
                          className="px-8 py-4 lg:py-6 text-base lg:text-lg rounded-full w-fit"
                        />
                      )}
                    </div>

                    {/* Right Content - Image */}
                    <div className="relative w-full lg:flex-1 h-[350px] sm:h-[450px] lg:h-[600px] mt-10 lg:mt-0">
                      {item.mainImg && (
                        <Image
                          src={item.mainImg}
                          alt={normalizeHtml(item.mainTitle ?? '')}
                          fill
                          priority
                          className="object-contain lg:object-right"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 lg:left-5" />
        <CarouselNext className="right-2 lg:right-5" />
        <div className="absolute bottom-6 left-0 right-0 flex justify-center">
          <CarouselDots className="bg-violet/10 p-1 px-3 rounded-full" />
        </div>
      </Carousel>
    </section>
  );
};

