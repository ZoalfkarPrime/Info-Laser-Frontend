import React from "react";
import {cn} from "@/lib/utils";
import {ClassName} from "@/types/types";
import {Container} from "@/components/shared/Container";
import Image from "next/image";

export const AboutMainMarquee: React.FC<ClassName> = ({className}) => {

  const images = {
    topImages: [
      {
        name: "1",
        url: "/img/about-marquee/top-marquee/1.jpg"
      },
      {
        name: "1",
        url: "/img/about-marquee/top-marquee/2.jpg"
      },
      {
        name: "3",
        url: "/img/about-marquee/top-marquee/3.jpg"
      },
      {
        name: "4",
        url: "/img/about-marquee/top-marquee/4.jpg"
      },
      {
        name: "5",
        url: "/img/about-marquee/top-marquee/5.jpg"
      },
      {
        name: "6",
        url: "/img/about-marquee/top-marquee/6.jpg"
      },
      {
        name: "7",
        url: "/img/about-marquee/top-marquee/7.jpg"
      },
      {
        name: "8",
        url: "/img/about-marquee/top-marquee/8.jpg"
      },
      {
        name: "9",
        url: "/img/about-marquee/top-marquee/9.jpg"
      },
      {
        name: "10",
        url: "/img/about-marquee/top-marquee/10.jpg"
      }
    ],
    botImages: [
      {
        name: "1",
        url: "/img/about-marquee/bot-marquee/1.jpg"
      },
      {
        name: "2",
        url: "/img/about-marquee/bot-marquee/2.jpg"
      },
      {
        name: "3",
        url: "/img/about-marquee/bot-marquee/3.jpg"
      },
      {
        name: "4",
        url: "/img/about-marquee/bot-marquee/4.jpg"
      },
      {
        name: "5",
        url: "/img/about-marquee/bot-marquee/5.jpg"
      },
      {
        name: "6",
        url: "/img/about-marquee/bot-marquee/6.jpg"
      },
      {
        name: "7",
        url: "/img/about-marquee/bot-marquee/7.jpg"
      },
      {
        name: "8",
        url: "/img/about-marquee/bot-marquee/8.jpg"
      },
      {
        name: "9",
        url: "/img/about-marquee/bot-marquee/9.jpg"
      },
      {
        name: "10",
        url: "/img/about-marquee/bot-marquee/10.jpg"
      }
    ],
    video: [
      {
        url: "/img/about-marquee/about-video.mp4",
      }
    ]
  }

  return (
    <section className={cn("relative pt-15 pb-30 max-md:pb-10", className)}>
      <Container className={"max-w-[760px] mb-10"}>
        <h3 className={cn(
          "text-center text-3xl",
          "max-xl:text-2xl max-xl:mb-3",
          "max-md:text-xl max-md:mb-2",
        )}>
          Машины + Передовое программное обеспечение =
          <span className={"text-[var(--violet)] ml-1"}>Творения, воплощенные в жизнь</span>
        </h3>
      </Container>

      {/* Движущиеся изображения */}
      <div className={"overflow-x-hidden"}>
        <div className="flex space-x-10 mb-5 animate-scroll-right">
          {[...images.topImages, ...images.topImages].map((item, index) => (
            <div key={index} className={cn(
              "rounded-3xl max-h-[160px] max-w-[160px] min-w-[160px] overflow-hidden",
              "max-md:max-h-[80px] max-md:max-w-[80px] max-md:min-w-[80px] max-md:rounded-xs"
            )}>
              <Image
                src={item.url}
                alt={item.name}
                width={160}
                height={160}
              />
            </div>
          ))}
        </div>

        <div className="flex space-x-10 animate-scroll-left">
          {[...images.botImages, ...images.botImages].map((item, index) => (
            <div key={index} className={cn(
              "rounded-3xl max-h-[160px] max-w-[160px] min-w-[160px] overflow-hidden",
              "max-md:max-h-[80px] max-md:max-w-[80px] max-md:min-w-[80px] max-md:rounded-xs"
            )}>
              <Image
                src={item.url}
                alt={item.name}
                width={160}
                height={160}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Блок с ноутбуком и видео */}
      <div className={cn(
        "absolute top-[215px] left-1/2 transform -translate-x-1/2 w-[700px] h-[400px]",
        "max-md:w-[320px] max-md:h-[200px] max-md:top-[150px]",
        "max-[470px]:!top-[200px]",
      )}>
        <Image
          src="/img/about-marquee/about-laptop.png"
          alt="Ноутбук"
          width={700}
          height={400}
          className={cn(
            "absolute z-30",
            "max-md:w-[320px] max-md:h-[200px]"
          )}
        />
        <video
          src={images.video[0].url}
          autoPlay
          loop
          muted
          playsInline
          className={cn(
            "absolute top-[23px] left-[83px] w-[78%] h-[84%] object-cover z-20",
            "max-md:left-[35px] max-md:top-[12px]"
          )}
        />
      </div>
    </section>
  );
};
