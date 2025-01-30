'use client';

import React, {useState} from 'react';
import {ChevronDown, X} from 'lucide-react';
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from '@radix-ui/react-collapsible';
import {Checkbox} from "@/components/ui/Checkbox";
import {FilterGroup} from "@/types/filter";

export const FiltersGroup: React.FC<FilterGroup> = ({title, items, defaultOpen = false}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <fieldset className="mb-3">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger
          className="flex items-center justify-between w-full mb-3 cursor-pointer"
          onClick={handleToggle}
        >
          <legend className="font-semibold">{title}</legend>
          {isOpen ? <X size={15}/> : <ChevronDown size={18}/>}
        </CollapsibleTrigger>

        <CollapsibleContent>
          <ul className="flex flex-col gap-3">
            {items.map((item) => (
              <li key={item.value} className="flex items-center space-x-2">
                <Checkbox value={String(item.value)} className="rounded-[8px] w-6 h-6 cursor-pointer"
                          id={`item-${item.value}`}/>
                <label htmlFor={`item-${item.value}`} className="leading-none cursor-pointer flex-1">
                  {item.name}
                </label>
              </li>
            ))}
          </ul>
        </CollapsibleContent>

      </Collapsible>
    </fieldset>
  );
};