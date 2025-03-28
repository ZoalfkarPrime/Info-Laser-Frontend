'use client';

import React from 'react';
import {cn} from '@/lib/utils';
import {Input} from '@/components/ui/Input';
import {RangeSlider} from '@/components/ui/Range-slider';
import {FiltersGroup} from "@/components/shared/filters/FiltersGroup";
import {useSet} from "react-use";
import {PriceProps} from "@/types/filter";
import qs from 'qs';
import {useRouter, useSearchParams} from "next/navigation";

export const Filters: React.FC = () => {

  const router = useRouter();
  const searchParams = useSearchParams();

  const materials = [
    {name: 'Бумага', value: 'bumaga'},
    {name: 'Мех', value: 'meh'},
    {name: 'Дерево', value: 'derevo'},
    {name: 'Картон', value: 'karton'},
    {name: 'Камень', value: 'kamen'},
    {name: 'Кожа', value: 'koja'},
    {name: 'Пластик', value: 'plastik'},
    {name: 'Резина', value: 'rezina'}
  ];

  const manufacturer = [
    {name: 'Wattsan', value: 'wattsan'},
    {name: 'Rabbit 15', value: 'rabbit15'},
    {name: 'Zerder', value: 'zwrder'}
  ];

  const [selectedMaterials, {toggle: toggleMaterial}] = useSet(
    new Set(searchParams.get('materials')?.split(',') || [])
  );

  const [selectedManufacturers, {toggle: toggleManufacturer}] = useSet(
    new Set(searchParams.get('manufacturer')?.split(',') || [])
  );

  const [prices, setPrice] = React.useState<PriceProps>({
    priceFrom: searchParams.get('priceFrom') ? Number(searchParams.get('priceFrom')) : undefined,
    priceTo: searchParams.get('priceTo') ? Number(searchParams.get('priceTo')) : undefined,
  });


  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrice({
      ...prices,
      [name]: value,
    });
  };

  React.useEffect(() => {
    const filters = {
      ...(prices.priceFrom ? {priceFrom: prices.priceFrom} : {}),
      ...(prices.priceTo ? {priceTo: prices.priceTo} : {}),
      ...(selectedMaterials.size ? {materials: Array.from(selectedMaterials)} : {}),
      ...(selectedManufacturers.size ? {manufacturer: Array.from(selectedManufacturers)} : {}),
    };

    const query = qs.stringify(filters, {arrayFormat: 'comma'});


    router.push(`?${query}`, {scroll: false});
  }, [prices, selectedMaterials, selectedManufacturers, router]);

  return (
    <div>
      <form className={cn('text-sm min-w-[250px] bg-[var(--gray)] p-5 rounded-3xl border border-gray-200')}>

        <fieldset className="mb-3">
          <legend className="font-semibold mb-3">Цена от и до:</legend>

          <div className="flex gap-3 mb-5">

            <Input
              type="number"
              min={0}
              max={150000}
              placeholder="0"
              value={String(prices.priceFrom)}
              onChange={(e) => updatePrice('priceFrom', Number(e.target.value))}
              className={"rounded-3xl bg-white"}
            />

            <Input
              type="number"
              min={100}
              max={150000}
              placeholder="150000"
              value={String(prices.priceTo)}
              onChange={(e) => updatePrice('priceTo', Number(e.target.value))}
              className={"rounded-3xl bg-white"}
            />
          </div>

          <RangeSlider
            min={0}
            max={150000}
            step={10}
            value={[prices.priceFrom || 0, prices.priceTo || 150000]}
            onValueChange={([priceFrom, priceTo]) => setPrice({priceFrom, priceTo})}
          />

        </fieldset>

        <FiltersGroup
          title={'Материалы обработки'}
          items={materials}
          defaultOpen={true}
          selectedIds={selectedMaterials}
          onClickCheckbox={toggleMaterial}
        />

        <FiltersGroup
          title={'Производитель'}
          items={manufacturer}
          selectedIds={selectedManufacturers}
          onClickCheckbox={toggleManufacturer}
        />

        <button
          type="button"
          className="mt-4 w-full bg-red-500 text-white py-2 rounded-3xl hover:bg-red-600 transition-colors duration-300 hover:cursor-pointer"
          onClick={() => {
            setPrice({priceFrom: undefined, priceTo: undefined});
            selectedMaterials.clear();
            selectedManufacturers.clear();
            router.push("?", {scroll: false});
          }}
        >
          Сбросить фильтр
        </button>
      </form>
    </div>
  );
};
