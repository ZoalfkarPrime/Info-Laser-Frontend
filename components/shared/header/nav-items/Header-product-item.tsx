'use client'

import React, {useEffect, useState} from 'react';
import {Container} from "@/components/shared/Container";
import {cn} from "@/lib/utils";
import Link from "next/link";
import {Overlay} from "@/components/shared/Overlay";
import {Product} from "@/types/product";
import {ChevronDown} from "lucide-react";

export const HeaderProductItem: React.FC<{ products: Product[] }> = ({products}) => {

  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  console.log(products);

  useEffect(() => {
    if (isProductsOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isProductsOpen]);

  return (

    <>
      <Overlay isOpen={isProductsOpen}/>

      <li
        className="z-30"
        onMouseLeave={() => setIsProductsOpen(false)}
      >

        <Link
          href={'/catalog'}
          className={cn(
            'relative flex items-center gap-x-1 rounded-md bg-gray-400/30 hover:text-[#6941f9] transition-colors duration-300 px-3 py-1',
            isProductsOpen ? 'text-[#6941f9] bg-gray-400/50 before:content-[] before:absolute before:left-0 before:bottom-[-40px] before:h-[40px] before:w-full' : '',
          )}
          onMouseEnter={() => setIsProductsOpen(true)}
        >
          Каталог

          <ChevronDown
            size={14}
            className={cn(
              'relative transition-all duration-300 ease-in-out',
              isProductsOpen ? 'top-0.5' : ' top-0',
            )}
          />
        </Link>

        <div className={cn(
          'absolute top-[64px] left-0 right-0 bg-white border-t border-t-gray-300  transition-all duration-300 ease-in-out z-30',
          isProductsOpen ? 'visible opacity-100' : 'invisible opacity-0',
        )}>
          <Container className={cn(
            'relative py-5 transition-all duration-300 ease-in-out',
            isProductsOpen ? 'top-0 ' : '-top-3',
          )}>
            <ul>
              <li>
                <Link href={'#'}>
                  Лазерные CO2
                </Link>
              </li>
              <li>
                <Link href={'#'}>
                  Маркираторы
                </Link>
              </li>
              <li>
                <Link href={'#'}>
                  Металлорезы
                </Link>
              </li>
            </ul>
          </Container>
        </div>

      </li>
    </>

  );
};
