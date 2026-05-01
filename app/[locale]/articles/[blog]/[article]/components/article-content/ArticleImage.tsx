import React from 'react';
import Image from "next/image";
import { decodeHtml } from "@/lib/utils";

import { ArticleImageData } from '@/types/article';

interface ArticleImageProps {
  data: ArticleImageData;
}

export const ArticleImage: React.FC<ArticleImageProps> = ({ data }) => {
  return (
    <div className="mb-5 max-md:mb-3">
      <Image
        className={"rounded-3xl w-full h-auto"}
        src={data.file.url}
        width={860}
        height={574}
        alt={decodeHtml(data.file.name)}
      />
    </div>
  );
};
