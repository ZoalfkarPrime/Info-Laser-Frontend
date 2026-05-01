import React from 'react';
import { CircleCheck } from "lucide-react";
import { cn, decodeHtml } from "@/lib/utils";

import { ArticleTitleWithListData } from '@/types/article';

interface ArticleTitleWithListProps {
  data: ArticleTitleWithListData;
}

export const ArticleTitleWithList: React.FC<ArticleTitleWithListProps> = ({ data }) => {
  return (
    <div className="mb-10 max-lg:mb-5">
      <h2
        className={cn(
          "text-[40px] font-semibold leading-11 mb-5",
          "max-lg:text-3xl max-lg:leading-9 max-lg:mb-3",
          "max-md:text-2xl max-md:leading-7"
        )}
      >
        {decodeHtml(data.title)}
      </h2>
      {data.body && data.body !== '"<p></p>\\n"' && (
        <div
          className={"mb-5 max-md:text-sm max-md:mb-3"}
          dangerouslySetInnerHTML={{ __html: decodeHtml(data.body).replace(/^"|"$/g, '').replace(/\\n/g, '') }}
        />
      )}
      
      {data.listStyle === 'numbered' ? (
        <ol className="space-y-2 mb-8 max-lg:mb-5 max-md:mb-3 max-md:text-sm">
          {data.items.map((item, index) => (
            <li key={item.uuid} className="flex items-start gap-3">
              <div
                className="min-w-[22px] min-h-[22px] flex items-center justify-center bg-[var(--violet)]/40 text-white font-bold rounded-full text-xs shrink-0">
                {index + 1}
              </div>
              <div dangerouslySetInnerHTML={{ __html: decodeHtml(item.text).replace(/^"|"$/g, '').replace(/\\n/g, '') }} />
            </li>
          ))}
        </ol>
      ) : (
        <ul className="space-y-2 mb-8 max-lg:mb-5 max-md:mb-3 max-md:text-sm">
          {data.items.map((item) => (
            <li key={item.uuid} className="flex items-start gap-3">
              <CircleCheck size={20} className={"text-white fill-[var(--violet)]/70 shrink-0"} />
              <div dangerouslySetInnerHTML={{ __html: decodeHtml(item.text).replace(/^"|"$/g, '').replace(/\\n/g, '') }} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
