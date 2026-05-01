import React from 'react';
import Image from "next/image";
import { Star, Check, ShoppingCart } from "lucide-react";
import { UniqButtonLink } from "@/components/ui/UniqButtonLink";
import { decodeHtml } from "@/lib/utils";

import { ArticleProductData } from '@/types/article';

interface ArticleProductProps {
  data: ArticleProductData;
}

export const ArticleProduct: React.FC<ArticleProductProps> = ({ data }) => {
  return (
    <div className="bg-[#F8F9FA] rounded-[32px] p-8 mb-10 flex gap-8 items-start max-lg:flex-col max-lg:p-6 max-lg:gap-6">
      {/* Product Image Wrapper */}
      <div className="bg-white rounded-[24px] p-6 w-[240px] h-[240px] flex items-center justify-center flex-shrink-0 max-lg:w-full max-lg:h-auto max-lg:aspect-square">
        <div className="relative w-full h-full">
          <Image
            src={data.file.url}
            alt={decodeHtml(data.title)}
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Product Info Section */}
      <div className="flex-1 pt-1">
        {/* Badge */}
        <div className="flex items-center gap-1.5 text-[var(--violet)] bg-[var(--violet)]/10 rounded-full px-3 py-1.5 text-xs font-medium w-fit mb-4">
          <Check size={14} />
          {decodeHtml(data.badge)}
        </div>

        {/* Title */}
        <h3 className="text-[24px] leading-tight font-bold mb-6 max-md:text-xl">
          {decodeHtml(data.title)}
        </h3>

        {/* Prices Grid */}
        <div className="flex gap-10 mb-8 max-md:gap-6 max-sm:flex-col max-sm:gap-3">
          <div>
            <p className="text-xs text-[#919294] mb-1 font-medium">{decodeHtml(data.price1Label)}</p>
            <p className="text-[22px] font-bold leading-none">{data.price1}</p>
          </div>
          <div>
            <p className="text-xs text-[#919294] mb-1 font-medium">{decodeHtml(data.price2Label)}</p>
            <p className="text-[22px] font-bold leading-none">{data.price2}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 mb-8 max-md:mb-5">
          <UniqButtonLink
            href={data.buttonLink}
            className="text-sm py-3 px-8 rounded-[16px] font-semibold"
          >
            {decodeHtml(data.buttonText)}
          </UniqButtonLink>
          <button className="bg-[var(--violet)]/10 text-[var(--violet)] p-3.5 rounded-[16px] hover:bg-[var(--violet)]/20 transition-colors">
            <ShoppingCart size={20} />
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="flex items-center gap-8 max-md:flex-wrap max-md:gap-4">
          <div className="flex items-center gap-1.5 text-xs font-medium">
            <Star size={16} className="fill-[#FBB040] text-[#FBB040]" />
            <span>{data.rating}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-[#5B5D61]">
            <Check size={16} className="text-[var(--violet)]" />
            <span>{decodeHtml(data.guarantee)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
