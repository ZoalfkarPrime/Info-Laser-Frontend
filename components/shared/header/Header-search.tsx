'use client'
import {useClickAway} from 'react-use';
import {Search, X} from "lucide-react";
import React, {useEffect, useRef, useState} from "react";
import {cn} from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import {getAllProducts} from "@/lib/api";
import {Product} from "@/types/product";
import {Container} from "@/components/shared/Container";
import {ptMono} from "@/app/fonts";
import {Overlay} from "@/components/shared/Overlay";

export const HeaderSearch = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const contentRef = useRef(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const closeAndClear = () => {
    setIsOpen(false);
    setQuery('');
    setFilteredProducts([])
  };

  useClickAway(contentRef, () => {
    closeAndClear();
  });

  const onItemClick = () => {
    closeAndClear();
  }

  // Получение всех продуктов
  useEffect(() => {
    const fetchProducts = async () => {
      const data: Product[] = await getAllProducts();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  // Получение отфильтрованных продуктов
  useEffect(() => {
    if (query.trim() === "") {
      setFilteredProducts([]);
      return;
    }

    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredProducts(filtered);
  }, [query, products]);

  // Фокус в input, если спойлер открыт
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // При клике на esc - закрытие контента спойлера-поиска
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        closeAndClear();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };

  }, [isOpen]);

  return (
    <>
      <Overlay isOpen={isOpen}/>

      <span className="w-[1px] h-6 bg-gray-300"></span>

      {/* Триггер для спойлера */}
      <button
        className="relative hover:text-[#6941f9] hover:cursor-pointer hover:bg-gray-200 p-1 mx-2 rounded-md transition-colors duration-300 z-30"
        type="button"
        onClick={() => setIsOpen(true)}
      >
        <Search size={18}/>
      </button>

      <span className="w-[1px] h-6 bg-gray-300"></span>

      {/* Контент спойлера */}
      <div ref={contentRef} className={cn(
        "fixed bg-white left-0 right-0 w-full transition-all duration-300 ease-in-out z-30",
        isOpen ? 'max-h-[5000px] opacity-100 top-0 visible' : 'max-h-0 opacity-0 -top-5 invisible'
      )}>

        <Container className="py-10 max-w-[1200px]">

          {/* Что вы ищите + Кнопка закрытия */}
          <div className="flex justify-between items-center mb-5">
            <span className={cn('text-xl', ptMono.className)}>Что вы ищите?</span>

            <button
              type="button"
              className="p-1 rounded-md hover:bg-gray-200 hover:cursor-pointer transition-colors duration-300"
              onClick={() => {
                closeAndClear()
              }}
            >
              <X className="text-red-500" size={20}/>
            </button>
          </div>

          {/* Форма поиска */}
          <form className="relative flex items-center gap-2 z-30">
            <input
              ref={inputRef}
              type="text"
              value={query}
              placeholder="Например, лазерный станок..."
              className="w-full bg-gray-100 border border-gray-300 px-3 pr-16 py-2 rounded-xl outline-none focus:border-[#6941f9]"
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsOpen(true)}
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
            <div
              className={cn('w-full rounded-lg shadow-md')}
            >
              {filteredProducts.map((product) => (
                <Link
                  className="flex items-center gap-4 hover:bg-[#f2f2f2] p-2"
                  href={`/catalog/${product.categorySlug}/${product.slug}`}
                  key={product.id}
                  onClick={onItemClick}
                >
                  {product.images?.length ? (
                    <Image
                      className="h-8 w-8"
                      src={product.images[0].url}
                      alt={product.images[0].alt}
                      width={product.images[0].width}
                      height={product.images[0].height}
                    />
                  ) : null}
                  <span className="leading-4">
                  {product.name}
                </span>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </div>
    </>
  );
};
