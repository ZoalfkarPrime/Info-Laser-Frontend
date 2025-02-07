'use client'

import React, {useEffect, useState} from 'react';
import {ClassName} from "@/types/types";
import {cn} from "@/lib/utils";
import Link from "next/link";
import {ChevronDown} from "lucide-react";
import {Overlay} from "@/components/shared/Overlay";

export const HeaderCity: React.FC<ClassName> = ({className}) => {

  const [isSpoilerOpen, setIsSpoilerOpen] = useState(false);

  useEffect(() => {
    if (isSpoilerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isSpoilerOpen]);

  return (

    <>
      <Overlay isOpen={isSpoilerOpen}/>

      <div
        className={cn('relative mr-3 ', className)}
        onMouseLeave={() => setIsSpoilerOpen(false)}
      >

        <Link
          href={'#'}
          className={cn(
            'flex items-center gap-x-1 text-[14px] bg-white hover:text-[#6941f9] transition-colors duration-300',
            isSpoilerOpen ? 'text-[#6941f9] before:content-[] before:absolute before:left-0 before:bottom-[-40px] before:h-[40px] before:w-full' : '',
          )}
          onMouseEnter={() => setIsSpoilerOpen(true)}
        >
          Санкт Петербург
          <ChevronDown
            size={12}
            className={cn(
              'relative transition-all duration-300 ease-in-out',
              isSpoilerOpen ? 'top-0.5' : ' top-0',
            )}
          />
        </Link>

        <div className={cn(
          'absolute top-[50px] right-0 bg-white border-t border-t-gray-300 rounded-md transition-all duration-300 ease-in-out z-30',
          isSpoilerOpen ? 'visible opacity-100' : 'invisible opacity-0',
        )}>

          <ul className={cn(
            'relative transition-all duration-300 ease-in-out',
            isSpoilerOpen ? 'top-0 ' : '-top-3',
          )}>
            <li>
              <Link className="block hover:text-[#6941f9] py-1 px-4" href={'#'}>
                Москва
              </Link>
            </li>
            <li>
              <Link className="block hover:text-[#6941f9] py-1 px-4" href={'#'}>
                Казань
              </Link>
            </li>
            <li>
              <Link className="block hover:text-[#6941f9] py-1 px-4" href={'#'}>
                Воронеж
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>


  );
};