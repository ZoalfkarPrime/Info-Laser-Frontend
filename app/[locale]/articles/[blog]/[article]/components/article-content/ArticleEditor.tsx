import { cn, decodeHtml } from "@/lib/utils";
import { ArticleEditorData } from '@/types/article';

interface ArticleEditorProps {
  data: ArticleEditorData;
}

export const ArticleEditor: React.FC<ArticleEditorProps> = ({ data }) => {
  const cleanText = decodeHtml(data.text)
    .replace(/^"|"$/g, '')
    .replace(/\\n/g, '');

  return (
    <div
      className={cn(
        "mb-5 last:mb-0 max-md:text-sm max-md:mb-3 article-editor-content",
        data.border?.width ? `border-${data.border.width}` : ""
      )}
      style={{ borderColor: data.border?.color }}
      dangerouslySetInnerHTML={{ __html: cleanText }}
    />
  );
};
