"use client";

import React, {useEffect, useState} from "react";
import {Container} from "@/components/shared/Container";
import {cn} from "@/lib/utils";
import Link from "next/link";
import {Overlay} from "@/components/shared/Overlay";
import {ChevronDown} from "lucide-react";

import {Category} from "@/types/category";
import {useMedia} from "react-use";
import {Product} from "@/types/product";
import {getAllProducts} from "@/api/products";
import {getCategories} from "@/api/categories";

export const HeaderProductItem: React.FC = () => {

  const isMobile = useMedia("(max-width: 1280px)");

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isSpoilerOpen, setIsSpoilerOpen] = useState(false);

  useEffect(() => {
    getAllProducts()
      .then((data) => setProducts(data))
      .catch((error) => console.error("Ошибка при загрузке продуктов:", error));
  }, []);

  useEffect(() => {
    getCategories()
      .then((data) => setCategories(data))
      .catch((error) => console.error("Ошибка при загрузке категорий:", error));
  }, []);

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


  return (
    <>
      <Overlay isOpen={!isMobile && isSpoilerOpen}/>

      <li
        onMouseLeave={() => setIsSpoilerOpen(false)}
        className={cn('max-xl:w-full')}
      >
        <button
          type="button"
          className={cn(
            "relative flex items-center gap-x-1 rounded-md xl:bg-gray-400/30 hover:text-[#6941f9] transition-colors duration-300 px-3 lg:py-1",
            "max-xl:w-full max-xl:justify-between max-xl:font-bold max-xl:px-2",
            isSpoilerOpen ? "lg:before:content-[] lg:before:absolute lg:before:left-0 lg:before:bottom-[-40px] lg:before:h-[40px] lg:before:w-full" : "",
            isSpoilerOpen ? "text-[#6941f9] xl:bg-gray-400/50 " : "",
          )}
          onMouseEnter={() => !isMobile && setIsSpoilerOpen(true)}
          onClick={() => isMobile && setIsSpoilerOpen(!isSpoilerOpen)}
        >
          Каталог
          <ChevronDown
            size={14}
            className={cn(
              "relative transition-all duration-300 ease-in-out",
              isSpoilerOpen ? "top-0.5" : " top-0"
            )}
          />
        </button>

        <div
          className={cn(
            "absolute top-[64px] left-0 right-0 bg-white xl:border-t xl:border-t-gray-300  transition-all duration-300 ease-in-out z-30",
            "max-xl:static max-xl:overflow-hidden",
            isSpoilerOpen ? "max-xl:max-h-full" : "max-xl:max-h-0",
            isSpoilerOpen ? "visible opacity-100" : "invisible opacity-0"
          )}
        >
          <Container
            className={cn(
              "relative xl:py-5 transition-all duration-300 ease-in-out",
              "max-lg: px-4",
              isSpoilerOpen ? "top-0 " : "-top-3"
            )}
          >
            <ul>
              {categories.length > 0 ? (
                categories.map((category) => (
                  <li key={category.id}>
                    <Link href={`/catalog/${category.slug}`}>{category.name}</Link>
                  </li>
                ))
              ) : (
                <li>Загрузка...</li>
              )}
            </ul>
          </Container>
        </div>
      </li>
    </>
  );
};
