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

export interface CharacteristicFilter {
  name: string;
  unit: string | null;
  items: { name: string; value: string }[];
}

interface FiltersProps {
  className?: string;
  materials: {name: string, value: string}[];
  manufacturers: {name: string, value: string}[];
  characteristics: CharacteristicFilter[];
  minPrice: number;
  maxPrice: number;
}

export interface PriceProps {
  priceFrom?: number,
  priceTo?: number
}

export const Filters: React.FC<FiltersProps> = ({ className, materials, manufacturers, characteristics, minPrice, maxPrice }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
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
    searchParams.get("filter[label_id]") === "2"
  );

  useEffect(() => {
    setPromoChecked(searchParams.get("filter[label_id]") === "2");
  }, [searchParams]);

  const updateSearchParams = (updates: Record<string, string | undefined | null>) => {
    const currentParams = Object.fromEntries(searchParams.entries());
    Object.keys(updates).forEach(key => {
      if (updates[key] === undefined || updates[key] === null || updates[key] === "") {
        delete currentParams[key];
      } else {
        currentParams[key] = updates[key]! as string;
      }
    });
    currentParams["page"] = "1";
    localStorage.setItem("sortingAndFiltersParams", JSON.stringify(currentParams));
    router.replace(`?${qs.stringify(currentParams)}`, {scroll: false});
  };

  const updateFilter = (checked: boolean) => {
    updateSearchParams({ "filter[label_id]": checked ? "2" : undefined });
    setPromoChecked(checked);
  };

  const [selectedMaterials, {toggle: toggleMaterial, clear: clearMaterials}] = useSet(
    new Set(searchParams.get('materials')?.split(',').filter(Boolean) || [])
  );

  const handleToggleMaterial = (value: string) => {
    toggleMaterial(value);
    const newSet = new Set(selectedMaterials);
    if (newSet.has(value)) newSet.delete(value); else newSet.add(value);
    updateSearchParams({ materials: newSet.size > 0 ? Array.from(newSet).join(",") : undefined });
  };

  const [selectedManufacturers, {toggle: toggleManufacturer, clear: clearManufacturers}] = useSet(
    new Set(searchParams.get('manufacturer')?.split(',').filter(Boolean) || [])
  );

  const handleToggleManufacturer = (value: string) => {
    toggleManufacturer(value);
    const newSet = new Set(selectedManufacturers);
    if (newSet.has(value)) newSet.delete(value); else newSet.add(value);
    updateSearchParams({ manufacturer: newSet.size > 0 ? Array.from(newSet).join(",") : undefined });
  };

  const handleToggleCharacteristic = (charName: string, value: string) => {
    const key = `char[${charName}]`;
    const currentValues = searchParams.get(key)?.split(',').filter(Boolean) || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    
    updateSearchParams({ [key]: newValues.length > 0 ? newValues.join(",") : undefined });
  };

  const [prices, setPrice] = React.useState<PriceProps>({
    priceFrom: searchParams.get('priceFrom') ? Number(searchParams.get('priceFrom')) : minPrice,
    priceTo: searchParams.get('priceTo') ? Number(searchParams.get('priceTo')) : maxPrice,
  });

  const resetAllFiltersAndSorting = () => {
    localStorage.removeItem("sortingAndFiltersParams");
    const basePath = window.location.pathname;
    
    // Clear all characteristic filters from searchParams
    const currentParams = Object.fromEntries(searchParams.entries());
    Object.keys(currentParams).forEach(key => {
      if (key.startsWith('char[')) {
        delete currentParams[key];
      }
    });
    delete currentParams['materials'];
    delete currentParams['manufacturer'];
    delete currentParams['filter[label_id]'];
    delete currentParams['priceFrom'];
    delete currentParams['priceTo'];
    delete currentParams['page'];

    router.replace(basePath, {scroll: false});
    setPromoChecked(false);
    clearMaterials();
    clearManufacturers();
    setPrice({ priceFrom: minPrice, priceTo: maxPrice });
  };

  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrice({
      ...prices,
      [name]: value,
    });
  };

  const commitPrice = (fromValue?: number, toValue?: number) => {
    const from = fromValue ?? prices.priceFrom;
    const to = toValue ?? prices.priceTo;
    updateSearchParams({
      priceFrom: from !== undefined && from > minPrice ? from.toString() : undefined,
      priceTo: to !== undefined && to < maxPrice ? to.toString() : undefined,
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
        isFilterOpen && "max-lg:left-0",
        className
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
              min={minPrice}
              max={maxPrice}
              placeholder={minPrice.toString()}
              value={String(prices.priceFrom)}
              onChange={(e) => updatePrice('priceFrom', Number(e.target.value))}
              onBlur={() => commitPrice()}
              onKeyDown={(e) => e.key === 'Enter' && commitPrice()}
              className={"rounded-3xl bg-white"}
            />

            <Input
              type="number"
              min={minPrice}
              max={maxPrice}
              placeholder={maxPrice.toString()}
              value={String(prices.priceTo)}
              onChange={(e) => updatePrice('priceTo', Number(e.target.value))}
              onBlur={() => commitPrice()}
              onKeyDown={(e) => e.key === 'Enter' && commitPrice()}
              className={"rounded-3xl bg-white"}
            />
          </div>

          <RangeSlider
            min={minPrice}
            max={maxPrice}
            step={10}
            value={[prices.priceFrom || minPrice, prices.priceTo || maxPrice]}
            onValueChange={([priceFrom, priceTo]) => setPrice({priceFrom, priceTo})}
            onValueCommit={([priceFrom, priceTo]) => commitPrice(priceFrom, priceTo)}
          />
        </fieldset>

        {materials.length > 0 && (
          <FiltersGroup
            title={'Материалы обработки'}
            items={materials}
            defaultOpen={true}
            selectedIds={selectedMaterials}
            onClickCheckbox={handleToggleMaterial}
          />
        )}

        {manufacturers.length > 0 && (
          <FiltersGroup
            title={'Производитель'}
            items={manufacturers}
            selectedIds={selectedManufacturers}
            onClickCheckbox={handleToggleManufacturer}
          />
        )}

        {characteristics.map((char) => (
          <FiltersGroup
            key={char.name}
            title={char.name}
            items={char.items}
            selectedIds={new Set(searchParams.get(`char[${char.name}]`)?.split(',').filter(Boolean) || [])}
            onClickCheckbox={(value) => handleToggleCharacteristic(char.name, value)}
          />
        ))}

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
