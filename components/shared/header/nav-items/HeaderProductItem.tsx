"use client";

import React, {useEffect, useState} from "react";
import {Container} from "@/components/shared/Container";
import {cn} from "@/lib/utils";
import Link from "next/link";
import {Overlay} from "@/components/shared/Overlay";
import {ChevronDown} from "lucide-react";
import {Category} from "@/types/types";
import {useMedia} from "react-use";
import {getCatalogData} from "@/api/api";
import Image from "next/image";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/Tabs";
import {Button} from "@/components/ui/Button";
import {DemoBtn} from "@/components/shared/btns/DemoBtn";
import {ProductCardHeader} from "@/components/shared/products/ProductCardHeader";

export const HeaderProductItem: React.FC = () => {

  const isMobile = useMedia("(max-width: 1280px)");

  const [categories, setCategories] = useState<{ product: Category[]; accessory: Category[] }>({
    product: [],
    accessory: [],
  });

  const [isSpoilerOpen, setIsSpoilerOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    getCatalogData()
      .then((data) => {
        setCategories(data);

        if (data.product.length > 0) {
          setActiveCategory(String(data.product[0].id));
        } else if (data.accessory.length > 0) {
          setActiveCategory(String(data.accessory[0].id));
        }
      })
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
            "relative flex items-center gap-x-1 rounded-2xl xl:bg-[var(--violet)] xl:text-white  transition-colors duration-300 px-3 lg:py-1",
            "max-xl:w-full max-xl:justify-between max-xl:font-bold max-xl:px-2",
            isSpoilerOpen ? "lg:before:content-[] lg:before:absolute lg:before:left-0 lg:before:bottom-[-40px] lg:before:h-[40px] lg:before:w-full" : "",
            isSpoilerOpen ? "text-[var(--violet)] xl:bg-gray-400/50 " : "",
          )}
          onMouseEnter={() => !isMobile && setIsSpoilerOpen(true)}
          onClick={() => isMobile ? setIsSpoilerOpen(!isSpoilerOpen) : setIsSpoilerOpen(false)}
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
            "absolute top-[80px] h-[85dvh] left-0 right-0 bg-gray-200 xl:border-t xl:border-t-gray-300  transition-all duration-300 ease-in-out overflow-hidden z-30",
            "max-xl:static max-xl:overflow-hidden",
            isSpoilerOpen ? "max-xl:max-h-full" : "max-xl:max-h-0",
            isSpoilerOpen ? "visible opacity-100" : "invisible opacity-0"
          )}
        >
          <Container
            className={cn(
              "relative xl:py-5 h-full transition-all duration-300 ease-in-out",
              "max-lg: px-4",
              isSpoilerOpen ? "top-0 " : "-top-3"
            )}
          >

            {
              activeCategory ? (
                <Tabs value={activeCategory} onValueChange={setActiveCategory} className="flex gap-10">
                  <div className={"basis-sm"}>
                    <TabsList
                      className={"flex flex-col items-start justify-start bg-inherit h-auto mb-1"}
                      asChild
                    >
                      <div>
                        <p className={"text-black uppercase font-semibold mb-2"}>Лазерные станки</p>
                        <ul className="flex flex-col w-full mb-3">
                          {categories.product.map((category) => (
                            <li key={category.id}>
                              <TabsTrigger
                                asChild
                                value={String(category.id)}
                                onMouseEnter={() => setActiveCategory(String(category.id))}
                              >

                                <Link
                                  className={cn(
                                    "flex items-center justify-start w-full gap-x-3 font-semibold bg-white rounded-lg px-3 py-2 mb-0",
                                    activeCategory && 'bg-inherit',
                                  )}
                                  href={`/catalog/${category.slug}`}
                                  onClick={() => setIsSpoilerOpen(false)}
                                >
                                  {category.banner_image_url && (
                                    <Image
                                      src={category.banner_image_url}
                                      alt={category.name}
                                      width={45}
                                      height={45}
                                    />
                                  )}
                                  {category.name}
                                </Link>
                              </TabsTrigger>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </TabsList>

                    <TabsList
                      className={"flex flex-col items-start justify-start bg-inherit h-auto"}
                      asChild
                    >
                      <div>
                        <p className={"text-black uppercase font-semibold mb-2"}>Комплектующие</p>
                        <ul className="flex flex-col w-full mb-3">
                          {categories.accessory.map((accessory) => (
                            <li key={accessory.id}>
                              <TabsTrigger
                                asChild
                                value={String(accessory.id)}
                                onMouseEnter={() => setActiveCategory(String(accessory.id))}
                              >
                                <Link
                                  className={cn(
                                    "flex items-center justify-start w-full gap-x-3 font-semibold bg-white rounded-lg px-3 py-2 mb-0",
                                    activeCategory && 'bg-inherit',
                                  )}
                                  href={`/catalog/${accessory.slug}`}
                                  onClick={() => setIsSpoilerOpen(false)}
                                >
                                  {accessory.banner_image_url && (
                                    <Image
                                      src={accessory.banner_image_url}
                                      alt={accessory.name}
                                      width={45}
                                      height={45}
                                    />
                                  )}
                                  {accessory.name}
                                </Link>
                              </TabsTrigger>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </TabsList>

                    <DemoBtn title={'Демонстрация онлайн'} className={"rounded-2xl"}/>
                  </div>

                  <div className={"flex-1"}>
                    {categories.product.map((category) => (
                      <TabsContent
                        asChild key={category.id}
                        value={String(category.id)}
                      >
                        <div className={'flex-1 max-h-[85dvh] overflow-y-auto pr-3 pb-10'}>
                          <p className={"text-2xl"}>{category.name}</p>
                          <div className={"flex justify-between mb-3"}>
                            <p>{category.description}</p>
                            <Link onClick={() => setIsSpoilerOpen(false)} href={`/catalog/${category.slug}`}>
                              <Button className={"block rounded-2xl"}>Смотреть все</Button>
                            </Link>
                          </div>

                          <ul className="grid grid-cols-3 gap-2">
                            {category.products.map((product) => (
                              <li key={product.id}>
                                <ProductCardHeader
                                  onClick={() => setIsSpoilerOpen(false)}
                                  {...product}
                                  inStock={Boolean(product.inStock)}
                                />
                              </li>
                            ))}
                          </ul>
                        </div>
                      </TabsContent>
                    ))}

                    {categories.accessory.map((accessory) => (
                      <TabsContent
                        asChild
                        key={accessory.id}
                        value={String(accessory.id)}
                      >
                        <div className={'flex-1 max-h-[85dvh] overflow-y-auto pr-3 pb-10'}>
                          <p className={"text-2xl"}>{accessory.name}</p>
                          <div className={"flex justify-between mb-3"}>
                            <p>{accessory.description}</p>
                            <Link
                              onClick={() => setIsSpoilerOpen(false)}
                              href={`/catalog/${accessory.slug}`}
                            >
                              <Button className={"block rounded-2xl"}>Смотреть все</Button>
                            </Link>
                          </div>

                          <ul className="grid grid-cols-4 gap-2">
                            {accessory.products.map((accessory) => (
                              <li key={accessory.id}>
                                <Link
                                  onClick={() => setIsSpoilerOpen(false)}
                                  className={"flex items-center gap-2 h-full bg-white rounded-xl leading-4 overflow-hidden p-2 hover:text-[var(--red)] focus:text-[var(--red)] transition-colors duration-300 ease-in-out"}
                                  href={`/catalog/${accessory.slug}`}
                                >
                                  {accessory.product_attachments && accessory.product_attachments.map((item) =>
                                      Boolean(item && item.is_main) && (
                                        <Image
                                          key={item.id}
                                          className="hover:scale-110 transition-transform z-10"
                                          src={item.external_url}
                                          alt={item.name}
                                          width={50}
                                          height={50}
                                        />
                                      )
                                  )}
                                  <p>{accessory.name}</p>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </TabsContent>
                    ))}
                  </div>
                </Tabs>
              ) : (<p>Загрузка...</p>)
            }
          </Container>
        </div>
      </li>
    </>
  );
};
