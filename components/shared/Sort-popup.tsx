import React from 'react';
import {cn} from "@/lib/utils";
import {ArrowUpDown} from "lucide-react";
import {ClassName} from "@/types/types";

export const SortPopup: React.FC<ClassName> = ({className}) => {
  return (
    <div
      className={cn('flex items-center justify-self-start gap-1 px-5 py-2 rounded-2xl cursor-pointer mb-5', className)}>
      <ArrowUpDown size={16}/>
      <b className="font-medium">Сортировать по:</b>
      <b className="text-primary">цене</b>
    </div>
  );
};
