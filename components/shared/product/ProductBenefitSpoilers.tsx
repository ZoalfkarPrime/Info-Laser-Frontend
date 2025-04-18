"use client";

import {ClassName} from "@/types/types";
import React, {useState} from "react";
import {cn} from "@/lib/utils";
import {
  ChevronDown,
  X,
  MapPin,
  ShieldCheck,
  Headset,
  Coins,
  LucideIcon
} from "lucide-react";

interface Item {
  id: number;
  name: string;
  content?: string;
  content2?: string;
  icon: LucideIcon;
}

export const ProductBenefitSpoilers: React.FC<ClassName> = ({className}) => {
  const items: Item[] = [
    {
      id: 1,
      name: "Удобная доставка в любой город России",
      content: "",
      icon: MapPin,
    },
    {
      id: 2,
      name: "Обязательная гарантия 1 год",
      content: "",
      icon: ShieldCheck,
    },
    {
      id: 3,
      name: "Техническая поддержка ",
      content: "Пуск и наладка, сервисное обслуживание",
      icon: Headset,
    },
    {
      id: 4,
      name: "Условия оплаты",
      content: "Оплата под заказ: Оплата делится по 50%",
      content2: "Оплата товара со склада: Оплата вносится 100%",
      icon: Coins,
    }
  ];

  const [openItems, setOpenItems] = useState<Record<number, boolean>>({});

  const handleToggle = (id: number) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <ul className={cn("", className)}>
      {items.map((item) => {
        const isOpen = openItems[item.id];
        const Icon = item.icon;

        return (
          <li
            key={item.id}
            className={cn("py-3 not-last:border-b border-gray-600")}
          >
            <button
              className={cn(
                "flex items-center justify-between text-sm w-full cursor-pointer transition-colors",
                "hover:text-[var(--violet)] focus:text-[var(--violet)]",
              )}
              onClick={() => handleToggle(item.id)}
            >
              <span className="flex items-center gap-2">
                <Icon size={18}/>
                {item.name}
              </span>
              {(item.content || item.content2) && (
                isOpen ? <X size={15}/> : <ChevronDown size={18}/>
              )}
            </button>
            <div className={cn(
              'flex flex-col gap-2 text-sm overflow-hidden text-[var(--gray-text)] transition-all duration-300 ease-in-out',
              isOpen ? 'max-h-[5000px] opacity-100 mt-2' : 'max-h-0 opacity-0',
            )}>
              {item.content && <p>{item.content}</p>}
              {item.content2 && <p>{item.content2}</p>}
            </div>
          </li>
        );
      })}
    </ul>
  );
};
