"use client";

import {Container} from "@/components/shared/Container";
import {cn} from "@/lib/utils";
import React from "react";
import {ClassName} from "@/types/types";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/Carousel";
import {CarouselDots} from "@/components/shared/carousels/CarouselDots";
import {ReviewsVideo} from "@/components/shared/reviews/ReviewsVideo";

export interface VideoReview {
  id: number;
  videoId?: string;
  author: string;
  date: string;
}

export const VideoReviews: React.FC<ClassName> = ({className}) => {

  const data: VideoReview[] = [
    {
      id: 1,
      videoId: 'Iti9VKIcKV4',
      author: 'Евгений Коренев',
      date: '12 мая 2024'
    },
    {
      id: 2,
      videoId: 'WG-BXo8PZSw',
      author: 'Евгений Коренев',
      date: '12 мая 2024'
    },
    {
      id: 3,
      videoId: 'LjwEKSYQoO8',
      author: 'Евгений Коренев',
      date: '12 мая 2024'
    },
    {
      id: 4,
      videoId: 'Iti9VKIcKV4',
      author: 'Евгений Коренев',
      date: '12 мая 2024'
    }
  ]

  return (
    <section className={cn(
      "bg-[var(--gray)] py-20 mb-10",
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
          Видео отзывы
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
                  "basis-1/3 pl-5",
                  "max-xl:basis-[75%]",
                  "max-md:basis-[85%] max-md:pl-2",
                )}
              >
                <div className={cn(
                  "block bg-white p-3 overflow-hidden rounded-3xl",
                  "max-md:p-2"
                )}>
                  <ReviewsVideo video={item}/>
                  <div className={cn(
                    "flex justify-between px-4",
                    "max-md:px-2"
                  )}>
                    <p className="font-semibold max-md:text-sm">{item.author}</p>
                    <p className="text-sm text-[var(--gray-text)] max-md:text-xs">{item.date}</p>
                  </div>
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
