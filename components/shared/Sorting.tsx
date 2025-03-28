"use client";

import {useSearchParams, useRouter} from "next/navigation";
import {useSorting} from "@/context/SortingContext";
import {cn} from "@/lib/utils";
import {ClassName} from "@/types/types";
import React from "react";

export const Sorting: React.FC<ClassName> = ({className}) => {
  const {sortBy, sortDirection, setSortBy} = useSorting();
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateSorting = (newSortBy: "price" | "popularity" | "sale") => {
    setSortBy(newSortBy);

    const params = new URLSearchParams(searchParams.toString());

    if (newSortBy === "sale") {
      params.set("sortBy", "sale");
      params.delete("sortDirection");
    } else {
      params.set("sortBy", newSortBy);
      params.set("sortDirection", sortBy === newSortBy ? (sortDirection === "desc" ? "asc" : "desc") : "desc");
    }

    router.push(`?${params.toString()}`, {scroll: false});
  };

  return (
    <div className={cn("flex items-center text-sm gap-3 mb-5", className)}>
      <p className="text-gray-400">Сортировать:</p>
      <p
        className={cn(
          "hover:text-[var(--violet)] cursor-pointer p-3 bg-[var(--gray)] rounded-3xl border transition-colors",
          sortBy === "price" && "text-[var(--violet)] !border-[var(--violet-dark)]",
        )}
        onClick={() => updateSorting("price")}
      >
        По цене {sortBy === "price" ? (sortDirection === "desc" ? "↓" : "↑") : ""}
      </p>
      <p
        className={cn(
          "hover:text-[var(--violet)] cursor-pointer p-3 bg-[var(--gray)] rounded-3xl border transition-colors",
          sortBy === "popularity" && "text-[var(--violet)] !border-[var(--violet-dark)]"
        )}
        onClick={() => updateSorting("popularity")}
      >
        По популярности {sortBy === "popularity" ? (sortDirection === "desc" ? "↓" : "↑") : ""}
      </p>
      <p
        className={cn(
          "hover:text-[var(--violet)] cursor-pointer p-3 bg-[var(--gray)] rounded-3xl border transition-colors",
          sortBy === "sale" && "text-[var(--violet)] !border-[var(--violet-dark)]"
        )}
        onClick={() => updateSorting("sale")}
      >
        Действует акция
      </p>
    </div>
  );
};
