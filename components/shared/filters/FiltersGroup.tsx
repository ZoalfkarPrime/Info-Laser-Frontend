'use client';

import React, {useState} from 'react';
import {ChevronDown, X} from 'lucide-react';
import {Checkbox} from '@/components/ui/Checkbox';
import {FilterGroup} from '@/types/filter';
import {cn} from "@/lib/utils";

export const FiltersGroup: React.FC<FilterGroup> = (
  {
    title,
    items,
    defaultOpen = false,
    onClickCheckbox,
    selectedIds
  }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <fieldset className="border-b border-b-gray-200">

      <legend
        className="font-semibold flex items-center justify-between w-full cursor-pointer py-2"
        onClick={handleToggle}
        aria-expanded={isOpen}
      >
        {title}
        {isOpen ? <X size={15}/> : <ChevronDown size={18}/>}
      </legend>

      <ul className={cn(
        "flex flex-col gap-2 overflow-hidden transition-all duration-300 ease-in-out",
        isOpen ? "max-h-[5000px] opacity-100 py-3" : "max-h-0 opacity-0",
      )}>
        {items.map((item) => (
          <li key={item.value} className="flex items-center space-x-2">
            <Checkbox
              value={String(item.value)}
              className="rounded-full w-6 h-6 cursor-pointer bg-white ml-1 shadow-none"
              id={`item-${item.value}`}
              checked={selectedIds?.has(item.value)}
              onClick={() => onClickCheckbox?.(item.value)}
            />
            <label
              htmlFor={`item-${item.value}`}
              className="leading-none cursor-pointer flex-1 hover:text-[var(--violet)] transition-colors"
            >
              {item.name}
            </label>
          </li>
        ))}
      </ul>

    </fieldset>
  );
};
