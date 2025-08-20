import React from "react";
import {cn} from "@/lib/utils";
import {Characteristics, ClassName} from "@/types/types";

interface ShortCharacteristicsProps extends ClassName {
  characteristics: Characteristics[];
}

export const ShortCharacteristics: React.FC<ShortCharacteristicsProps> = ({className, characteristics}) => {
  return (
    <>
      {/* Краткие характеристики */}
      {characteristics && (() => {
        // Сортируем: сначала is_featured, затем по order
        const sorted = [...characteristics].sort(
          (a, b) =>
            Number(b.is_featured ?? 0) - Number(a.is_featured ?? 0) ||
            Number(a.order ?? 0) - Number(b.order ?? 0)
        );

        // Берём только первые 8 характеристик
        const limited = sorted.slice(0, 8);

        // Делим на 2 колонки: 4 слева, 4 справа
        const midpoint = Math.ceil(limited.length / 2);
        const firstColumn = limited.slice(0, midpoint);
        const secondColumn = limited.slice(midpoint);

        return (
          <dl className={cn(
            "flex gap-x-10 text-sm mb-3",
            "max-md:text-xs",
            className
          )}>
            {[firstColumn, secondColumn].map((column, i) => (
              <div key={i} className="flex-1 space-y-1">
                {column.map((spec, index) => (
                  <div key={index} className="flex items-end">
                    <dt
                      className={cn(
                        "flex-1 relative overflow-hidden text-[var(--gray-text)] z-30",
                        "after:content-[''] after:absolute after:bottom-1 after:w-[80%] after:h-px after:border-b after:border-dotted after:border-gray-400 after:z-20",
                        spec.is_featured ? "font-bold" : ""
                      )}
                    >
                      {spec.name}
                    </dt>
                    <dd
                      className={cn(
                        "relative bg-white text-right z-30",
                        spec.is_featured ? "font-bold" : ""
                      )}
                    >
                      {spec.value} {spec.unit}
                    </dd>
                  </div>
                ))}
              </div>
            ))}
          </dl>
        );
      })()}
    </>
  );
}
