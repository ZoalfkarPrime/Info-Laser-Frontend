'use client';

import React, {useState} from 'react';
import {ChevronDown} from 'lucide-react';
import {cn} from '@/lib/utils';
import {routing} from '@/i18n/routing';
import {Overlay} from '@/components/shared/Overlay';
import {Link, usePathname} from '@/i18n/navigation';
import {useLocale} from 'next-intl';
import {ClassName} from "@/types/types";

const cityNames: Record<string, string> = {
  spb: 'Санкт-Петербург',
  msk: 'Москва',
  kzn: 'Казань'
};

export const HeaderCity: React.FC<ClassName> = ({className}) => {
  const [isSpoilerOpen, setIsSpoilerOpen] = useState(false);
  const pathname = usePathname();

  const locale = useLocale();
  const currentCityName = cityNames[locale];

  return (
    <>
      <Overlay isOpen={isSpoilerOpen} onClose={() => setIsSpoilerOpen(false)}/>

      <div
        className={cn('relative mr-3 max-md:w-full', className)}
        onMouseLeave={() => setIsSpoilerOpen(false)}
      >
        <button
          className={cn(
            'flex items-center gap-x-1 text-[14px] bg-white hover:text-[var(--violet)] transition-colors duration-300',
            "max-md:mb-3",
            isSpoilerOpen
              ? 'text-[var(--violet)] before:content-[""] before:absolute before:left-0 before:bottom-[-40px] before:h-[40px] before:w-full'
              : ''
          )}
          onClick={() => setIsSpoilerOpen(!isSpoilerOpen)}
          onMouseEnter={() => {
            setIsSpoilerOpen(true);
          }}
        >
          {currentCityName}
          <ChevronDown
            size={14}
            className={cn(
              'relative transition-all duration-300 ease-in-out',
              isSpoilerOpen ? 'top-0.5' : 'top-0'
            )}
          />
        </button>

        <div
          className={cn(
            'absolute top-13 right-0 bg-white border-t border-t-gray-300 rounded-3xl shadow-md transition-all duration-300 z-30',
            'xl:w-max xl:max-w-[250px] xl:rounded-3xl xl:shadow-sm xl:shadow-[#4F26E9]',
            isSpoilerOpen ? 'opacity-100 visible scale-100' : 'opacity-0 invisible scale-95',
            isSpoilerOpen ? "max-md:max-h-full" : "max-md:max-h-0",
            "max-md:relative max-md:top-0 max-md:-left-[30px] max-md:overflow-hidden",
            "max-md:shadow-none max-md:border-0 max-md:rounded-none"
          )}
        >
          <ul className="xl:p-1">
            {routing.locales.map((locale) => (
              <li key={locale}>
                <Link
                  className={cn(
                    'block w-full text-left py-2 px-4 text-sm',
                    'xl:px-3 xl:py-2 xl:rounded-3xl xl:transition-colors xl:duration-300 xl:ease-in-out',
                    'hover:text-[var(--violet)] xl:hover:bg-[var(--violet-dark)]',
                    "max-md:px-0"
                  )}
                  onClick={() => setIsSpoilerOpen(false)}
                  href={pathname}
                  locale={locale}
                >
                  {cityNames[locale]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
