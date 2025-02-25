'use client'
import {Search, X} from "lucide-react";
import React, {useEffect, useRef, useState} from "react";
import {cn} from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import {Product} from "@/types/product";
import {Container} from "@/components/shared/Container";
import {ptMono} from "@/app/fonts";
import {Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger} from "@/components/ui/Sheet";
import {getProducts} from "@/api/api";

export const HeaderSearchBtn = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const closeAndClear = () => {
    setIsOpen(false);
    setQuery('');
    setFilteredProducts([]);
  };

  const onItemClick = () => {
    closeAndClear();
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const allProducts = await getProducts();
      setProducts(allProducts);
    };

    fetchProducts();
  }, []);

  // Фильтрация продуктов
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

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <span className="w-[1px] h-6 bg-gray-300"></span>
      <SheetTrigger asChild>
        <button
          className="relative hover:text-[#6941f9] hover:cursor-pointer hover:bg-gray-200 p-1 mx-2 rounded-md transition-colors duration-300 z-30"
          type="button"
        >
          <Search size={18}/>
        </button>
      </SheetTrigger>
      <span className="w-[1px] h-6 bg-gray-300"></span>

      <SheetDescription className="hidden"/>
      <SheetContent className="[&>button]:hidden" side="top">
        <SheetTitle className="hidden"/>
        <Container className="py-10 max-w-[1200px]">

          {/* Заголовок + Кнопка закрытия */}
          <div className="flex justify-between items-center mb-5">
            <span className={cn('text-xl', ptMono.className)}>Что вы ищите?</span>

            <SheetClose asChild>
              <button
                type="button"
                className="p-1 rounded-md hover:bg-gray-200 hover:cursor-pointer transition-colors duration-300"
                onClick={closeAndClear}
              >
                <X className="text-red-500" size={20}/>
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
              className="w-full bg-gray-100 border border-gray-300 px-3 pr-16 py-2 rounded-xl outline-none focus:border-[#6941f9]"
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
            <div className={cn('w-full rounded-lg shadow-md')}>
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
      </SheetContent>
    </Sheet>
  );
};
