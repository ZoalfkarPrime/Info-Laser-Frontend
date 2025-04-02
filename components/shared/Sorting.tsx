"use client";

import {useRouter, useSearchParams} from "next/navigation";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/Select";
import React, {useEffect} from "react";
import qs from "qs";
import {cn} from "@/lib/utils";

interface SortingProps {
  className?: string;
  currentSort: { order_column?: string; order_dir?: "asc" | "desc" | "" };
}

export const Sorting: React.FC<SortingProps> = ({className, currentSort}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const savedSort = localStorage.getItem("sortingAndFiltersParams");
    if (savedSort) {
      const parsedSort = JSON.parse(savedSort);
      const currentQuery = Object.fromEntries(searchParams.entries());

      // Проверяем, есть ли вообще сортировка в URL
      const hasSortingInURL = currentQuery.order_column || currentQuery.order_dir;

      // Если в URL нет сортировки, но есть в localStorage — подставляем её
      if (!hasSortingInURL) {
        router.replace(`?${qs.stringify(parsedSort)}`, {scroll: false});
      }
    }
  }, [router, searchParams]);

  const updateSorting = (value: string) => {
    let orderColumn: string | null = null;
    let orderDir: "asc" | "desc" | null = null;

    // Определяем параметры сортировки на основе выбранного значения
    if (value === "rating") {
      orderColumn = "rating";
      orderDir = "desc";
    } else if (value === "price_desc") {
      orderColumn = "orderPrice";
      orderDir = "desc";
    } else if (value === "price_asc") {
      orderColumn = "orderPrice";
      orderDir = "asc";
    }

    // Создаём новые параметры сортировки, включая параметры из текущего URL
    const newParams = {
      ...Object.fromEntries(searchParams.entries()),
      ...(orderColumn ? {order_column: orderColumn} : {}),
      ...(orderDir ? {order_dir: orderDir} : {}),
    };

    // Сохраняем новые параметры в localStorage
    localStorage.setItem("sortingAndFiltersParams", JSON.stringify(newParams));

    // Обновляем URL с новыми параметрами
    router.push(`?${qs.stringify(newParams)}`, {scroll: false});
  };

  return (
    <div className={cn("flex items-center gap-5", className)}>
      <div className="flex items-center gap-3">
        <label className="block text-sm font-semibold" htmlFor="sorting">Сортировка:</label>
        <Select
          onValueChange={updateSorting}
          value={
            currentSort.order_column === "rating"
              ? "rating"
              : currentSort.order_column === "orderPrice" && currentSort.order_dir === "desc"
                ? "price_desc"
                : currentSort.order_column === "orderPrice" && currentSort.order_dir === "asc"
                  ? "price_asc"
                  : ""
          }
        >
          <SelectTrigger className="rounded-3xl" id="sorting">
            <SelectValue placeholder="Выберите сортировку"/>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rating">По популярности</SelectItem>
            <SelectItem value="price_desc">Сначала дорогие</SelectItem>
            <SelectItem value="price_asc">Сначала дешевые</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};