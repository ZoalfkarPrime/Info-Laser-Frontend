import React from 'react';
import { cn, decodeHtml } from "@/lib/utils";

import { ArticleTableData } from '@/types/article';

interface ArticleTableProps {
  data: ArticleTableData;
}

export const ArticleTable: React.FC<ArticleTableProps> = ({ data }) => {
  const getSpans = (index: number) => {
    switch (index) {
      case 0: return "col-start-1 col-end-6 text-left";
      case 1: return "col-start-6 col-end-8 text-left";
      case 2: return "col-start-8 col-end-12 text-left";
      case 3: return "col-start-12 col-end-13 text-left";
      default: return "";
    }
  };

  return (
    <div className="overflow-x-auto mb-10 max-lg:mb-5">
      <table className={cn(
        "w-full text-sm bg-[var(--gray)] rounded-3xl overflow-hidden",
        "max-md:text-xs"
      )}>
        <thead className="font-semibold border-b border-gray-500">
          <tr className="grid grid-cols-12 gap-3 p-5 max-md:p-2 max-md:gap-2">
            {data.columns.map((col, index) => (
              <th key={col.uuid} className={getSpans(index)}>
                {decodeHtml(col.header)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row) => (
            <tr
              key={row.uuid}
              className="grid grid-cols-12 gap-3 items-center p-5 border-b border-gray-300 last:border-none"
            >
              {data.columns.map((col, index) => (
                <td key={col.uuid} className={getSpans(index)}>
                  {decodeHtml(row.cells[col.uuid] || '-')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
