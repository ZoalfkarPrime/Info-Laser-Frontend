"use client";

import React from "react";
import {cn} from "@/lib/utils";
import Link from "next/link";

export const AllCharacteristicsBtn = () => {

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
        "inline-block underline",
        "hover:text-[var(--red)] transition-colors"
      )}
    >
      Все характеристики
    </Link>
  );
};
