import React from 'react';
import { ArticleEditor } from './ArticleEditor';
import { ArticleTextWithList } from './ArticleTextWithList';
import { ArticleTitleImageBody } from './ArticleTitleImageBody';
import { ArticleTitleWithList } from './ArticleTitleWithList';
import { ArticleImage } from './ArticleImage';
import { ArticleTable } from './ArticleTable';
import { ArticleProduct } from './ArticleProduct';
import { ArticleEditorWithBackground } from './ArticleEditorWithBackground';
import { 
  ArticleContentItem, 
  ArticleEditorData, 
  ArticleEditorWithBackgroundData, 
  ArticleTextWithListData, 
  ArticleTitleImageBodyData, 
  ArticleTitleWithListData, 
  ArticleImageData, 
  ArticleTableData, 
  ArticleProductData 
} from '@/types/article';

interface ArticleContentProps {
  content: ArticleContentItem[];
}

export const ArticleContent: React.FC<ArticleContentProps> = ({ content }) => {
  return (
    <>
      {content.map((item) => {
        switch (item.type) {
          case 'editor':
            return <ArticleEditor key={item.uuid} data={item.data as ArticleEditorData} />;
          case 'editor-with-background':
            return <ArticleEditorWithBackground key={item.uuid} data={item.data as ArticleEditorWithBackgroundData} />;
          case 'text-with-list':
            return <ArticleTextWithList key={item.uuid} data={item.data as ArticleTextWithListData} />;
          case 'title-image-body':
            return <ArticleTitleImageBody key={item.uuid} data={item.data as ArticleTitleImageBodyData} />;
          case 'title-with-list':
            return <ArticleTitleWithList key={item.uuid} data={item.data as ArticleTitleWithListData} />;
          case 'image':
            return <ArticleImage key={item.uuid} data={item.data as ArticleImageData} />;
          case 'table':
            return <ArticleTable key={item.uuid} data={item.data as ArticleTableData} />;
          case 'product':
            return <ArticleProduct key={item.uuid} data={item.data as ArticleProductData} />;
          case 'table-of-contents':
            // Table of contents is usually handled in the sidebar/aside
            return null;
          default:
            console.warn(`Unknown article content type: ${item.type}`);
            return null;
        }
      })}
    </>
  );
};
