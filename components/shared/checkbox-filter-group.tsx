'use client';

import React from 'react';
import {CheckboxFilter, FilterCheckboxProps} from "@/components/shared/checkbox-filter";

type Item = FilterCheckboxProps;

interface Props {
  title: string,
  items: Item[],
  // defaultItems: Item[],
  // limit?: number,
  // searchInputPlaceholder?: string,
  // onChange?: (values: string[]) => void,
  // defaultValue?: string,
  className?: string,
}

export const CheckboxFilterGroup: React.FC<Props> = (
  {
    title,
    items,
    // defaultItems,
    // limit = 6,
    // searchInputPlaceholder = 'Поиск...',
    className,
    // onChange,
    // defaultValue,
  }
) => {

  // const [showAll, setShowAll] = React.useState(false);
  // const list = showAll ? items : items.slice(0, limit);

  return (
    <fieldset className={className}>
      <legend className="font-semibold mb-3">{title}</legend>

      {/*{*/}
      {/*  showAll && (*/}
      {/*    <div className="mb-5">*/}
      {/*      <Input placeholder={searchInputPlaceholder} className="bg-gray-50 border-none"/>*/}
      {/*    </div>*/}
      {/*  )*/}
      {/*}*/}

      <ul className="flex flex-col gap-3">
        {items.map((item, index) => (
          <CheckboxFilter
            key={index}
            text={item.text}
            value={item.value}
            endAdornment={item.endAdornment}
            checked={false}
            onCheckedChange={(idx) => console.log(idx)}
          />
        ))}
      </ul>

      {/*{items.length > limit && (*/}
      {/*  <div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>*/}
      {/*    <button onClick={() => setShowAll(!showAll)} className="text-primary mt-3">*/}
      {/*      {showAll ? 'Скрыть' : '+ Показать все'}*/}
      {/*    </button>*/}
      {/*  </div>*/}
      {/*)}*/}

    </fieldset>
  );
};
