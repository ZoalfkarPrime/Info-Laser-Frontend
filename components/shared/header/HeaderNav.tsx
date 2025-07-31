"use client";

import React, {useEffect, useRef, useState} from "react";
import {HeaderProductItem} from "@/components/shared/header/nav-items/HeaderProductItem";
import {cn} from "@/lib/utils";
import {Globe, Menu, X} from "lucide-react";
import {Overlay} from "@/components/shared/Overlay";
import {useClickAway} from "react-use";
import {HeaderAboutCompanyItem} from "@/components/shared/header/nav-items/HeaderAboutCompanyItem";
import {HeaderServiceItem} from "@/components/shared/header/nav-items/HeaderServiceItem";
import {HeaderPaymentItem} from "@/components/shared/header/nav-items/HeaderPaymentItem";
import {HeaderContactsItem} from "@/components/shared/header/nav-items/HeaderContactsItem";
import {HeaderContacts} from "@/components/shared/header/HeaderContacts";
import {HeaderCity} from "@/components/shared/header/HeaderCity";

export const HeaderNav: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef(null);
  const menuRef = useRef<HTMLButtonElement | null>(null);

  useClickAway(
    navRef,
    (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;

      if (menuRef.current && target && menuRef.current.contains(target)) {
        return;
      }
      setIsMenuOpen(false);
    },
    ['mousedown']
  );

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <>

      <Overlay isOpen={isMenuOpen}/>

      <nav
        ref={navRef}
        className={cn(
          "bg-white ml-auto mr-4",
          "max-xl:fixed max-xl:w-full max-xl:shadow-lg max-xl:border-t max-xl:border-t-gray-300 max-xl:overflow-y-scroll",
          "max-xl:top-[88px] max-xl:left-[-110%] max-xl:max-h-[90dvh]",
          "max-xl:px-2 max-xl:py-2",
          "max-xl:transition-all max-xl:duration-200",
          "max-xl:rounded-bl-3xl max-xl:rounded-br-3xl",
          "max-md:top-[66px]",
          isMenuOpen && "max-xl:left-0"
        )}
      >
        <HeaderContacts
          className={cn(
            "md:hidden",
            "max-xl:flex-row max-xl:justify-between max-xl:px-2",
            "max-md:pb-2 max-md:border-b max-md:border-b-gray-500"
          )}
        />

        <ul className={cn(
          "flex items-center gap-x-1",
          "max-xl:flex-col max-xl:items-start max-xl:mb-3",
          "[&>li]:relative [&>li]:first:static",
          "[&>li]:max-xl:w-full [&>li]:max-xl:py-2 [&>li]:max-xl:border-b [&>li]:max-xl:border-b-gray-500",
          "[&>li>a]:block [&>li>a]:px-2 [&>li>a]:transition-colors",
          "[&>li>a]:max-md:text-sm [&>li>button]:max-md:text-sm",
          "[&>li>a]:xl:py-2 [&>li>a]:xl:text-sm [&>li>a]:xl:rounded-3xl [&>li>a]:xl:hover:bg-[var(--violet-dark)]",
          "[&>li>a]:max-xl:w-full [&>li>a]:max-xl:justify-between [&>li>a]:max-xl:font-bold",
        )}>

          <HeaderProductItem onClick={() => setIsMenuOpen(false)}/>

          <HeaderAboutCompanyItem onClick={() => setIsMenuOpen(false)}/>

          <HeaderServiceItem onClick={() => setIsMenuOpen(false)}/>

          <HeaderPaymentItem onClick={() => setIsMenuOpen(false)}/>

          <HeaderContactsItem onClick={() => setIsMenuOpen(false)}/>

        </ul>

        <div className={cn(
          "max-xl:flex max-xl:gap-x-2 max-xl:px-1 max-xl:py-2",
          "md:hidden"
        )}>
          <Globe/>
          <HeaderCity/>
        </div>

      </nav>

      {/* Бургер кнопка */}
      <button
        ref={menuRef}
        className={cn(
          "xl:hidden",
          "max-xl:block max-xl:bg-gray-200 max-xl:transition max-xl:p-1 max-xl:rounded-md",
          "max-xl:absolute max-xl:right-8",
          "max-md:right-4"
        )}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <X size={24}/> : <Menu size={24}/>}
      </button>
    </>

  );
};
