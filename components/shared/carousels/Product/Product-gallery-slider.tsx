"use client";

import React, {useState, useEffect, useCallback} from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import {ThumbButton} from "@/components/shared/carousels/Product/Thumb-button";
import {Attachments} from "@/types/types";

interface ProductGallerySliderProps {
  images: Attachments[];
}

export const ProductGallerySlider: React.FC<ProductGallerySliderProps> = ({images}) => {
  const getYouTubeThumbnail = (url: string) => {
    const match = url.match(/[?&]v=([^&]+)/);
    return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : null;
  };

  const processedImages = images
    .map((img) => {
      const isVideo = img.type === "video";
      const youtubeThumbnail = isVideo ? getYouTubeThumbnail(img.external_url) : null;
      const videoEmbedUrl = isVideo
        ? `https://www.youtube.com/embed/${new URL(img.external_url).searchParams.get("v")}`
        : null;

      return {
        url: img.external_url,
        thumbnail: isVideo ? youtubeThumbnail ?? "/placeholder.jpg" : img.external_url,
        alt: img.name || "Изображение товара",
        type: img.type,
        videoEmbedUrl,
        isMain: img.is_main ?? false,
      };
    })
    .sort((a, b) => (b.isMain ? 1 : -1));

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel({loop: true});
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

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

  return (
    <div className="flex flex-col gap-4 max-w-[650px]">
      <div className="flex gap-4">
        {/* Миниатюры */}
        <div ref={emblaThumbsRef}>
          <div className="flex flex-col gap-2">
            {processedImages.map((image, idx) => (
              <ThumbButton
                key={idx}
                index={idx}
                onClick={() => onThumbClick(idx)}
                selected={idx === selectedIndex}
                image={{...image, url: image.thumbnail}}
              />
            ))}
          </div>
        </div>

        {/* Основной слайдер */}
        <div className="overflow-hidden" ref={emblaMainRef}>
          <div className="flex">
            {processedImages.map((image, idx) => (
              <div className="min-w-full flex justify-center bg-gray-300 rounded-lg p-3" key={idx}>
                {image.type === "video" ? (
                  image.videoEmbedUrl ? (
                    <iframe
                      className="w-full max-w-2xl rounded-lg aspect-video"
                      src={image.videoEmbedUrl}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video className="w-full max-w-2xl rounded-lg" muted autoPlay loop controls src={image.url}/>
                  )
                ) : (
                  <Image src={image.url} alt={image.alt} width={450} height={350}/>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
