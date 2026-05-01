import React from 'react';
import { cn, decodeHtml } from "@/lib/utils";

import { ArticleEditorWithBackgroundData } from '@/types/article';

interface ArticleEditorWithBackgroundProps {
  data: ArticleEditorWithBackgroundData;
}

export const ArticleEditorWithBackground: React.FC<ArticleEditorWithBackgroundProps> = ({ data }) => {
  const cleanText = decodeHtml(data.text)
    .replace(/^"|"$/g, '')
    .replace(/\\n/g, '')
    // Strip inline backgrounds that might hide the container's background
    .replace(/background(-color)?\s*:\s*[^;]+;?/gi, '');

  return (
    <div
      className={cn(
        "bg-[#F3F4F6] rounded-[32px] p-8 mb-10 last:mb-0",
        "max-md:p-5 max-md:mb-5 max-md:text-sm article-editor-content"
      )}
      dangerouslySetInnerHTML={{ __html: cleanText }}
    />
  );
};
