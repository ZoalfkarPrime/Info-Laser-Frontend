"use client";

import React, {useEffect, useState} from "react";
import {Container} from "@/components/shared/Container";
import {cn} from "@/lib/utils";
import Link from "next/link";
import {Overlay} from "@/components/shared/Overlay";
import {Product} from "@/types/product";
import {ChevronDown} from "lucide-react";
import {getAllProducts, getCategories} from "@/lib/api";
import {Category} from "@/types/category";

export const HeaderProductItem: React.FC = () => {
  
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
    if (isSpoilerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isSpoilerOpen]);

  return (
    <>
      <Overlay isOpen={isSpoilerOpen}/>

      <li onMouseLeave={() => setIsSpoilerOpen(false)}>
        <button
          type="button"
          className={cn(
            "relative flex items-center gap-x-1 rounded-md bg-gray-400/30 hover:text-[#6941f9] transition-colors duration-300 px-3 py-1",
            isSpoilerOpen
              ? "text-[#6941f9] bg-gray-400/50 before:content-[] before:absolute before:left-0 before:bottom-[-40px] before:h-[40px] before:w-full"
              : ""
          )}
          onMouseEnter={() => setIsSpoilerOpen(true)}
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
            "absolute top-[64px] left-0 right-0 bg-white border-t border-t-gray-300  transition-all duration-300 ease-in-out z-30",
            isSpoilerOpen ? "visible opacity-100" : "invisible opacity-0"
          )}
        >
          <Container
            className={cn(
              "relative py-5 transition-all duration-300 ease-in-out",
              isSpoilerOpen ? "top-0 " : "-top-3"
            )}
          >
            <ul>
              {categories.length > 0 ? (
                categories.map((category) => (
                  <li key={category.id}>
                    <Link href={`/${category.slug}`}>{category.name}</Link>
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
