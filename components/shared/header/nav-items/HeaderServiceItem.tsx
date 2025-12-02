"use client";

import React, {useEffect, useState} from "react";
import {cn} from "@/lib/utils";
import Link from "next/link";
import {Overlay} from "@/components/shared/Overlay";
import {ChevronDown} from "lucide-react";
import {useMedia} from "react-use";
import {ClassName} from "@/types/types";

interface Props extends ClassName {
  onClick?: () => void;
}

export const HeaderServiceItem: React.FC<Props> = ({className, onClick}) => {

  const isMobile = useMedia("(max-width: 1280px)", false);

  const [isSpoilerOpen, setIsSpoilerOpen] = useState(false);

  useEffect(() => {
    if (!isMobile) {
      document.body.style.overflow = isSpoilerOpen ? "hidden" : "";
    }

    return () => {
      if (!isMobile) {
        document.body.style.overflow = "";
      }
    };
  }, [isSpoilerOpen, isMobile]);

  const handleLinkClick = () => {
    setIsSpoilerOpen(false);
    onClick?.();
  };

  return (
    <>
      <Overlay isOpen={!isMobile && isSpoilerOpen}/>

      <li
        onMouseLeave={() => setIsSpoilerOpen(false)}
        className={cn("", className)}
      >

        <button
          type="button"
          className={cn(
            'flex items-center gap-x-1 bg-white hover:text-[var(--violet)] transition-colors duration-300',
            isSpoilerOpen ? 'before:content-[] before:absolute before:left-0 before:bottom-[-40px] before:h-[40px] before:w-full' : '',
            "max-xl:w-full max-xl:justify-between max-xl:font-bold max-xl:px-2",
            "xl:p-2 xl:px-3 xl:text-sm",
          )}
          onMouseEnter={() => !isMobile && setIsSpoilerOpen(true)}
          onClick={() => isMobile ? setIsSpoilerOpen(!isSpoilerOpen) : setIsSpoilerOpen(false)}
        >
          Сервис
          <ChevronDown
            size={14}
            className={cn(
              'relative transition-position duration-300 ease-in-out',
              isSpoilerOpen ? 'top-0.5' : ' top-0',
            )}
          />
        </button>

        <div className={cn(
          'absolute top-15 left-0 bg-white border-t border-t-gray-300 rounded-3xl overflow-hidden transition-all duration-300 ease-in-out z-30',
          "xl:w-max xl:max-w-[250px] xl:shadow-sm xl:shadow-[#4F26E9]",
          "max-xl:static max-xl:border-0 max-xl:overflow-hidden max-xl:rounded-none",
          isSpoilerOpen ? 'visible opacity-100' : 'invisible opacity-0',
          isSpoilerOpen ? "max-xl:max-h-full max-xl:pt-1" : "max-xl:max-h-0",
        )}>

          <ul className={cn(
            'relative text-sm transition-position duration-300 ease-in-out',
            "xl:p-1",
            isSpoilerOpen ? 'top-0 ' : '-top-3',
          )}>
            <li>
              <Link
                className={cn(
                  "block px-2 transition-colors",
                  'max-xl:w-full max-xl:justify-between max-xl:font-bold',
                  "xl:px-3 xl:py-2 xl:hover:bg-[var(--violet-dark)] xl:transition-colors xl:duration-300 xl:ease-in-out xl:rounded-3xl",
                  "max-xl:font-normal max-xl:py-1"
                )}
                href={"/adjustment"}
                onClick={handleLinkClick}
              >
                Пусконаладка оборудования
              </Link>
            </li>
          </ul>
        </div>
      </li>
    </>
  );
};
