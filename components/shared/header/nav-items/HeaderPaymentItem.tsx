import Link from "next/link";
import {cn} from "@/lib/utils";
import React from "react";

export const HeaderPaymentItem: React.FC = () => {
  return (
    <li>
      <Link
        className={cn(
          'max-xl:w-full max-xl:justify-between max-xl:font-bold',
          "block px-2 transition-colors",
          "xl:py-2 xl:px-2 xl:text-sm xl:rounded-3xl",
          "xl:hover:bg-[var(--violet-dark)]"
        )}
        href={"/delivery"}>
        Оплата и доставка
      </Link>
    </li>
  );
};

