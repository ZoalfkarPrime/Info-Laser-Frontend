"use client";

import React, {useEffect, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {cn} from "@/lib/utils";
import {Switch} from "@/components/ui/Switch";
import qs from "qs";

interface FiltersProps {
  className?: string;
}

export const Filters: React.FC<FiltersProps> = ({className}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Инициализируем состояние свитча, если в URL есть filter[label_id]==="2"
  const [promoChecked, setPromoChecked] = useState(
    Object.fromEntries(searchParams.entries())["filter[label_id]"] === "2"
  );

  // Обновляем состояние при изменении searchParams
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
    localStorage.setItem("sortingAndFiltersParams", JSON.stringify(currentParams));
    router.push(`?${qs.stringify(currentParams)}`, {scroll: false});
    setPromoChecked(checked);
  };

  const resetAllFiltersAndSorting = () => {
    // Удаляем все параметры из localStorage
    localStorage.removeItem("sortingAndFiltersParams");
    // Обновляем URL до базового пути без query-параметров
    const basePath = window.location.pathname;
    router.replace(basePath, {scroll: false});
    // Сбрасываем локальное состояние
    setPromoChecked(false);
  };

  return (
    <div className={className}>
      <form className={cn("text-sm bg-[var(--gray)] p-5 rounded-3xl border border-gray-200")}>
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

        <button
          type="button"
          className="mt-4 w-full bg-red-500 text-white py-2 rounded-3xl hover:bg-red-600 transition-colors duration-300 hover:cursor-pointer"
          onClick={resetAllFiltersAndSorting}
        >
          Сбросить фильтр
        </button>
      </form>
    </div>
  );
};
