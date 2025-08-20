"use client";

import React, {useEffect, useRef, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {cn} from "@/lib/utils";
import {Switch} from "@/components/ui/Switch";
import qs from "qs";
import {Input} from "@/components/ui/Input";
import {RangeSlider} from "@/components/ui/Range-slider";
import {useClickAway, useSet} from "react-use";
import {FiltersGroup} from "@/components/shared/filters/FiltersGroup";
import {ListFilterPlus, X} from "lucide-react";
import {Overlay} from "@/components/shared/Overlay";
import {Button} from "@/components/ui/Button";

interface FiltersProps {
  className?: string;
}

export interface PriceProps {
  priceFrom?: number,
  priceTo?: number
}

export const Filters: React.FC<FiltersProps> = () => {

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const formRef = useRef(null);
  const formModalRef = useRef<HTMLButtonElement | null>(null);

  useClickAway(
    formRef,
    (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;

      if (formModalRef.current && target && formModalRef.current.contains(target)) {
        return;
      }
      setIsFilterOpen(false);
    },
    ['mousedown']
  );

  useEffect(() => {
    if (isFilterOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isFilterOpen]);
  const router = useRouter();
  const searchParams = useSearchParams();

  const [promoChecked, setPromoChecked] = useState(
    Object.fromEntries(searchParams.entries())["filter[label_id]"] === "2"
  );

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    setPromoChecked(params["filter[label_id]"] === "2");
  }, [searchParams]);

  const updateFilter = (checked: boolean) => {
    const currentParams = Object.fromEntries(searchParams.entries());
    if (checked) {
      currentParams["filter[label_id]"] = "2";
    } else {
      delete currentParams["filter[label_id]"];
    }
    // При изменении фильтра, сбрасываем страницу на 1
    currentParams["page"] = "1";

    localStorage.setItem("sortingAndFiltersParams", JSON.stringify(currentParams));
    router.replace(`?${qs.stringify(currentParams)}`, {scroll: false});
    setPromoChecked(checked);
  };

  const resetAllFiltersAndSorting = () => {
    localStorage.removeItem("sortingAndFiltersParams");
    const basePath = window.location.pathname;
    router.replace(basePath, {scroll: false});
    setPromoChecked(false);
  };

  // TODO Тут удалить моки (или доработать)
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

  return (
    <>

      <Overlay isOpen={isFilterOpen}/>

      <form ref={formRef} className={cn(
        "text-sm bg-[var(--gray)] p-5 rounded-3xl border border-gray-200 z-50 mb-5",
        "max-lg:fixed max-lg:w-full max-lg:shadow-lg max-lg:overflow-y-scroll max-lg:mb-0",
        "max-lg:top-[30px] max-lg:left-[-110%] max-lg:max-h-[90dvh]",
        "max-lg:transition-all max-lg:duration-200",
        isFilterOpen && "max-lg:left-0"
      )}>

        <div className={cn(
          "lg:hidden",
          "max-lg:flex max-lg:items-center max-lg:justify-between max-lg:mb-5",
        )}>

          <h2 className={"flex items-center gap-x-2 text-xl font-bold"}>
            <ListFilterPlus
              className={"flex justify-center items-center text-white bg-[var(--violet)] rounded-full p-1"}
              size={24}
            />
            Фильтры
          </h2>

          <X
            size={30}
            onClick={() => setIsFilterOpen(false)}
          />

        </div>

        {/* Акция */}
        <fieldset className="flex items-center gap-3 border-b border-b-gray-200 mb-3 pb-3">
          <legend className="contents">
            <label className="block text-sm font-semibold" htmlFor="promo">
              Действует акция:
            </label>
          </legend>
          <Switch
            id="promo"
            checked={promoChecked}
            onCheckedChange={(checked) => updateFilter(checked)}
          />
        </fieldset>

        {/* Цена */}
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

        <Button
          type="button"
          variant={"red"}
          className={"w-full mt-4"}
          onClick={resetAllFiltersAndSorting}
        >
          Сбросить фильтр
        </Button>
      </form>

      <button
        ref={formModalRef}
        className={cn(
          "lg:hidden",
          "max-lg:relative max-lg:text-xs",
          "max-lg:inline-flex max-lg:items-center max-lg:gap-x-3 max-lg:bg-[var(--violet-dark)] max-lg:rounded-3xl max-lg:py-2 max-lg:px-3",
        )}
        onClick={() => setIsFilterOpen(!isFilterOpen)}
      >
        <ListFilterPlus
          className={"flex justify-center items-center text-white bg-[var(--violet)] rounded-full p-1"}
          size={24}
        />
        Фильтры
      </button>
    </>
  );
};
