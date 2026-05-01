import React from 'react';
import Image from "next/image";
import { cn, decodeHtml } from "@/lib/utils";

import { ArticleTitleImageBodyData } from '@/types/article';

interface ArticleTitleImageBodyProps {
  data: ArticleTitleImageBodyData;
}

export const ArticleTitleImageBody: React.FC<ArticleTitleImageBodyProps> = ({ data }) => {
  return (
    <div className={"grid grid-cols-12 gap-x-5 mb-8"}>
      <h2
        className={cn(
          "col-span-full text-[40px] leading-11 font-semibold mb-5",
          "max-xl:text-3xl max-xl:leading-9",
          "max-md:text-2xl max-md:leading-7 max-md:mb-3"
        )}
      >
        {decodeHtml(data.title)}
      </h2>
      <div className={"col-start-1 col-end-7 max-md:col-span-full"}>
        <div
          className={"mb-5 max-md:text-sm max-md:mb-3"}
          dangerouslySetInnerHTML={{ __html: decodeHtml(data.body).replace(/^"|"$/g, '').replace(/\\n/g, '') }}
        />
      </div>
      <div className={"col-start-7 col-end-13 max-md:col-span-full relative h-[360px] max-md:h-[240px]"}>
        <Image
          className={"object-cover rounded-3xl"}
          src={data.file.url}
          fill
          alt={decodeHtml(data.title)}
        />
      </div>
    </div>
  );
};
