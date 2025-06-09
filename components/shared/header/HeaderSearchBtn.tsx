'use client'

import {Search, X} from "lucide-react";
import React, {useEffect, useRef, useState} from "react";
import {useDebounce} from "react-use";
import {cn} from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import {Container} from "@/components/shared/Container";
import {Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger} from "@/components/ui/Sheet";
import {Product} from "@/types/types";

type SearchProps = {
  products: Product[];
};

export const HeaderSearchBtn = ({products}: SearchProps) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const closeAndClear = () => {
    setIsOpen(false);
    setQuery("");
    setFilteredProducts([]);
  };

  const onItemClick = () => {
    closeAndClear();
  };

  // Debounce для запроса
  useDebounce(() => {
    setDebouncedQuery(query);
  }, 300, [query]);

  // Фильтрация продуктов после debounce
  useEffect(() => {
    if (debouncedQuery.trim() === "") {
      setFilteredProducts([]);
      return;
    }

    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(debouncedQuery.toLowerCase())
    );

    setFilteredProducts(filtered);
  }, [debouncedQuery, products]);

  // Фокус в input, если спойлер открыт
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <span className={cn(
        "w-[1px] h-6 bg-gray-300",
        "max-xl:ml-auto"
      )}></span>
      <SheetTrigger asChild>
        <button
          className="relative hover:text-[var(--violet)] hover:cursor-pointer hover:bg-gray-200 p-1 mx-2 rounded-md transition-colors duration-300 z-30"
          type="button"
        >
          <Search size={18}/>
        </button>
      </SheetTrigger>
      <span className="w-[1px] h-6 bg-gray-300"></span>

      <SheetDescription className="hidden"/>
      <SheetContent className="[&>button]:hidden rounded-b-3xl" side="top">
        <SheetTitle className="hidden"/>
        <Container className={cn(
          "py-10 max-w-[1200px] max-h-[90dvh] overflow-hidden",
          "max-xl:py-3"
        )}>

          {/* Заголовок + Кнопка закрытия */}
          <div className="flex justify-between items-center mb-5">
            <span className={cn("text-xl")}>Что вы ищите?</span>

            <SheetClose asChild>
              <button
                type="button"
                className="p-1 rounded-md hover:bg-gray-200 hover:cursor-pointer transition-colors duration-300"
                onClick={closeAndClear}
              >
                <X className="text-[var(--red)]" size={20}/>
              </button>
            </SheetClose>
          </div>

          {/* Поле поиска */}
          <form className="relative flex items-center gap-2 z-30">
            <input
              ref={inputRef}
              type="text"
              value={query}
              placeholder="Например, лазерный станок..."
              className="w-full bg-gray-100 border border-gray-300 px-3 pr-16 py-2 rounded-3xl outline-none focus:!border-[var(--violet)]"
              onChange={(e) => setQuery(e.target.value)}
            />

            {query && (
              <button
                type="button"
                className="absolute top-1/2 translate-y-[-50%] right-10 p-1 hover:cursor-pointer rounded-md hover:bg-red-400"
                onClick={() => setQuery("")}
              >
                <X size={18}/>
              </button>
            )}

            <button
              className="absolute top-1/2 translate-y-[-50%] right-3 p-1 hover:cursor-pointer rounded-md hover:bg-blue-400"
              type="submit"
            >
              <Search size={18}/>
            </button>
          </form>

          {/* Результаты поиска */}
          {filteredProducts.length > 0 && (
            <div className={cn('w-full rounded-lg shadow-md max-h-[63dvh] overflow-y-auto')}>
              {filteredProducts.map((product) => (
                <Link
                  className="flex items-center gap-4 hover:bg-[#f2f2f2] p-2"
                  href={`/catalog/${product.categories?.[0]?.slug || "default-category"}/${product.slug}`}
                  key={product.id}
                  onClick={onItemClick}
                >
                  {product.product_attachments && product.product_attachments.map((item) =>
                      Boolean(item && item.is_main) && (
                        <Image
                          key={item.id}
                          className="size-8"
                          src={item.external_url}
                          alt={item.name}
                          width={32}
                          height={32}
                        />
                      )
                  )}
                  <span className="leading-4">
                    {product.name}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </SheetContent>
    </Sheet>
  );
};
