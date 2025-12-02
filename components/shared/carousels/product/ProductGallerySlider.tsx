"use client";

import React, {useState, useEffect, useCallback} from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import {ThumbBtn} from "@/components/shared/carousels/product/ThumbBtn";
import {Attachments, ClassName, Label} from "@/types/types";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/Button";
import {ChevronLeft, ChevronRight, Play, X} from "lucide-react";
import {PhotoProvider, PhotoView} from 'react-photo-view';

interface ProductGallerySliderProps extends ClassName {
  images: Attachments[];
  labels?: Label[];
}

export const ProductGallerySlider: React.FC<ProductGallerySliderProps> = ({images, className, labels}) => {
  const processedImages = images
    .filter((img) => img.type !== "video" && img.filemanager && img.filemanager.url)
    .map((img) => ({
      url: img.filemanager!.url,
      thumbnail: img.filemanager!.url,
      alt: img.name || "Изображение товара",
      type: img.type,
      isMain: img.is_main ?? false,
      width: img.width,
      height: img.height
    }))
    .sort((a, b) => (b.isMain ? 1 : -1));

  // const video = images.find((img) => img.type === "video");

  // Ищем видео из бэка
  const rawVideo = images.find((img) => img.type === "video");

  // Преобразуем ссылку YouTube в embed
  const getYoutubeEmbedUrl = (url: string) => {
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/
    );
    return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1` : null;
  };

  // Делаем embed только если URL — реально YouTube
  const embedUrl = rawVideo?.filemanager?.url
    ? getYoutubeEmbedUrl(rawVideo.filemanager.url)
    : null;

  // Видео считаем видео только если embedUrl существует
  const video = embedUrl ? rawVideo : null;
  
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel({
    loop: true,
    align: 'start'
  });
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi]);

  useEffect(() => {
    if (!emblaMainApi) return;
    emblaMainApi.on("select", onSelect).on("reInit", onSelect);
    onSelect();
  }, [emblaMainApi, onSelect]);

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsVideoOpen(false);
      }
    };

    if (isVideoOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isVideoOpen]);

  // // Преобразуем ссылку на YouTube в embed-ссылку
  // const getYoutubeEmbedUrl = (url: string) => {
  //   const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/);
  //   return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1` : null;
  // };

  // const embedUrl = video?.filemanager.url ? getYoutubeEmbedUrl(video.filemanager.url) : null;

  return (
    <>
      <div className={cn(
        "grid grid-cols-12 gap-3",
        "max-md:gap-0 max-md:gap-y-3",
        className
      )}>
        {/* Миниатюры */}
        <div
          className={cn(
            "max-h-[475px] overflow-y-auto col-start-1 col-end-3 justify-items-start",
            "max-md:hidden"
          )}
          ref={emblaThumbsRef}
        >
          <div className="flex flex-col gap-2">
            {processedImages && processedImages.length > 0 ? (
              processedImages.map((image, idx) => (
                <ThumbBtn
                  key={idx}
                  index={idx}
                  onClick={() => onThumbClick(idx)}
                  selected={idx === selectedIndex}
                  image={{...image, url: image.thumbnail}}
                />
              ))
            ) : (
              <div
                className="w-[100px] h-[100px] flex items-center justify-center bg-gray-200 text-gray-400 text-xs rounded-xl">
                нет фото
              </div>
            )}
          </div>
        </div>

        {/* Основной слайдер */}
        <div
          className={cn(
            "relative overflow-hidden col-start-3 col-end-13 h-fit rounded-bl-3xl rounded-tl-3xl",
            "max-md:col-span-full"
          )}
          ref={emblaMainRef}
        >

          {labels && labels.map((label) => (
            (label.slug === 'hit' || label.slug === 'in_sale' || label.slug === 'new') && (
              <p
                key={label.id}
                className={cn(
                  "absolute block w-[73px] h-[73px] text-[15px] top-[-28px] left-[-28px] rounded-full text-white uppercase z-20",
                  label.slug === 'hit' ? "bg-[var(--green)] -rotate-45" : "bg-[var(--pink)] rotate-0",
                  label.slug === 'new' ? "bg-[var(--green)]" : ""
                )}
              >
          <span
            className={cn(
              "absolute ",
              label.slug === 'hit' ? "right-[21px] bottom-[6px]" : "right-[16px] bottom-[11px] font-semibold",
              label.slug === 'new' ? "-rotate-45 right-[3px]" : "",
            )}
          >
            {label.slug === 'hit' ? "хит" : ""}
            {label.slug === 'new' ? "new" : ""}
            {label.slug === 'in_sale' ? "%" : ""}
          </span>
              </p>
            )
          ))}

          <PhotoProvider>
            <ul
              className={cn(
                "flex",
                "max-md:gap-x-2 max-md:px-2"
              )}
            >
              {processedImages && processedImages.length > 0 ? (
                processedImages.map((image, idx) => (
                  <li
                    key={idx}
                    className={cn(
                      "min-w-full max-h-[475px] flex justify-center bg-[var(--gray)] rounded-3xl p-3",
                      "max-md:min-w-0 max-md:shrink-0 max-md:grow-0 max-md:basis-[85%] max-md:rounded-[20px]"
                    )}
                  >
                    <PhotoView src={image.url}>
                      <Image
                        className="w-full h-full object-contain cursor-zoom-in"
                        src={image.url}
                        alt={image.alt || "Фото продукта"}
                        width={image.width || 800}
                        height={image.height || 600}
                      />
                    </PhotoView>
                  </li>
                ))
              ) : (
                <li
                  className={cn(
                    "min-w-full min-h-[475px] max-h-[475px] flex items-center justify-center bg-gray-200 text-gray-400 text-sm rounded-3xl p-3",
                    "max-md:min-w-0 max-md:shrink-0 max-md:grow-0 max-md:basis-[85%] max-md:rounded-[20px]"
                  )}
                >
                  нет фото
                </li>
              )}
            </ul>
          </PhotoProvider>

          {/* Кнопка "влево" */}
          <button
            onClick={() => emblaMainApi?.scrollPrev()}
            className={cn(
              "flex items-center justify-center absolute top-1/2 left-2 -translate-y-1/2 z-10 h-8 w-8 bg-white shadow-sm shadow-black transition-colors rounded-full overflow-x-hidden border border-gray-600",
              "hover:cursor-pointer hover:bg-gray-100"
            )}
            aria-label="Предыдущий слайд"
          >
            <ChevronLeft className="text-black size-5"/>
          </button>

          {/* Кнопка "вправо" */}
          <button
            onClick={() => emblaMainApi?.scrollNext()}
            className={cn(
              "flex items-center justify-center absolute top-1/2 right-2 -translate-y-1/2 z-10 h-8 w-8 bg-white shadow-sm shadow-black transition-colors rounded-full overflow-x-hidden border border-gray-600",
              "hover:cursor-pointer hover:bg-gray-100"
            )}
            aria-label="Следующий слайд"
          >
            <ChevronRight className="text-black size-5"/>
          </button>
        </div>

        {/* Кнопка "Видео" */}
        {video && (
          <Button
            variant={"violetOutline"}
            onClick={() => setIsVideoOpen(true)}
            className={cn(
              "col-start-7 col-end-9 gap-x-2",
              "max-md:place-self-center max-md:col-span-full",
            )}
          >
            <Play size={16} fill="var(--violet)"/>
            Видео
          </Button>
        )}
      </div>

      {/* Модальное окно */}
      {isVideoOpen && embedUrl && (
        <div
          className="fixed inset-0 bg-black/80 bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setIsVideoOpen(false)}
        >
          <div
            className="relative w-full max-w-3xl aspect-video bg-black rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={embedUrl}
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="w-full h-full"
            ></iframe>

            {/* Кнопка закрытия */}
            <button
              onClick={() => setIsVideoOpen(false)}
              className={cn(
                "absolute -top-10 right-2 bg-white p-1 rounded-full shadow-md transition-colors",
                "hover:cursor-pointer hover:bg-gray-100 hover:[&_svg]:text-red-500"
              )}
              aria-label="Закрыть видео"
            >
              <X className="text-black size-5"/>
            </button>
          </div>
        </div>
      )}

    </>
  );
};
