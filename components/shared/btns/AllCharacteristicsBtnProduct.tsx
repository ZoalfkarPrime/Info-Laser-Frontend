"use client";

import React from "react";
import {cn} from "@/lib/utils";
import Link from "next/link";
import {ClassName} from "@/types/types";

export const AllCharacteristicsBtn: React.FC<ClassName> = ({className}) => {

  const handleScrollToSpecs = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const section = document.getElementById("specifications");
    if (section) {
      section.scrollIntoView({behavior: "smooth"});
    }
  };

  return (
    <Link
      href="#"
      onClick={handleScrollToSpecs}
      className={cn(
        "text-sm text-[var(--violet)] inline-block transition-colors",
        "hover:text-[var(--red)]",
        "max-md:text-xs",
        className
      )}
    >
      Все характеристики
    </Link>
  );
};
