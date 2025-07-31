"use client";

import React, {useEffect, useState} from "react";
import {Container} from "@/components/shared/Container";
import {cn} from "@/lib/utils";
import Link from "next/link";
import {Overlay} from "@/components/shared/Overlay";
import {ChevronDown} from "lucide-react";
import {Category, ClassName} from "@/types/types";
import {useMedia} from "react-use";
import {getCatalogData} from "@/api/api";
import Image from "next/image";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/Tabs";
import {Button} from "@/components/ui/Button";
import {DemoBtn} from "@/components/shared/btns/DemoBtn";
import {ProductCardHeader} from "@/components/shared/products/ProductCardHeader";

interface Props extends ClassName {
  onClick?: () => void;
}

export const HeaderProductItem: React.FC<Props> = ({className, onClick}) => {

  const isMobile = useMedia("(max-width: 1280px)");

  const [categories, setCategories] = useState<{ product: Category[]; accessory: Category[] }>({
    product: [],
    accessory: [],
  });

  const handleLinkClick = () => {
    setIsSpoilerOpen(false);
    onClick?.();
  };

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
        className={cn("", className)}
      >
        <button
          type="button"
          className={cn(
            "relative flex items-center gap-x-1 rounded-3xl xl:bg-[var(--violet)] xl:text-white  transition-colors duration-300 px-3 lg:py-1",
            "max-xl:w-full max-xl:justify-between max-xl:font-bold max-xl:px-2",
            isSpoilerOpen ? "lg:before:content-[] lg:before:absolute lg:before:left-0 lg:before:bottom-[-40px] lg:before:h-[40px] lg:before:w-full" : "",
            isSpoilerOpen ? "xl:bg-gray-400/50 " : "",
            "xl:text-sm xl:py-2 xl:px-3"
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
            "absolute top-[88px] h-[85dvh] left-0 right-0 bg-white rounded-b-4xl xl:border-t xl:border-t-gray-300  transition-all duration-300 ease-in-out overflow-hidden z-30",
            "max-xl:static max-xl:overflow-hidden max-xl:h-auto",
            isSpoilerOpen ? "max-xl:max-h-full" : "max-xl:max-h-0",
            isSpoilerOpen ? "visible opacity-100" : "invisible opacity-0",
          )}
        >
          <Container
            className={cn(
              "relative xl:py-5 h-full transition-all duration-300 ease-in-out",
              "max-xl:!px-1",
              isSpoilerOpen ? "top-0 " : "-top-3"
            )}
          >

            {
              activeCategory ? (
                <Tabs value={activeCategory} onValueChange={setActiveCategory} className="flex gap-10">
                  <div className={cn(
                    "basis-sm",
                    "max-xl:basis-full max-xl:pt-1",
                  )}>
                    <TabsList
                      className={"flex flex-col items-start justify-start bg-inherit h-auto mb-1 max-xl:mb-0"}
                      asChild
                    >
                      <div>
                        <p className={"text-[var(--gray-text)] uppercase font-semibold mb-2 text-sm"}>
                          Лазерные станки
                        </p>
                        <ul className={cn(
                          "flex flex-col w-full mb-3",
                          "max-xl:mb-0"
                        )}>
                          {categories.product.map((category) => (
                            <li key={category.id}>
                              <TabsTrigger
                                asChild
                                value={String(category.id)}
                                onMouseEnter={() => setActiveCategory(String(category.id))}
                              >
                                <Link
                                  className={cn(
                                    "flex items-center justify-start w-full gap-x-3 bg-white px-3 mb-0",
                                    "xl:font-semibold xl:!rounded-3xl",
                                    "max-xl:px-0 max-xl:gap-x-2",
                                    String(category.id) === activeCategory ? "xl:!bg-[var(--gray)] xl:!text-[var(--violet)] !shadow-none" : "text-black",
                                  )}
                                  href={`/catalog/${category.slug}`}
                                  onClick={handleLinkClick}
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
                        <p className={"text-[var(--gray-text)] uppercase font-semibold mb-2 text-sm"}>Комплектующие</p>
                        <ul className={cn(
                          "flex flex-col w-full mb-3",
                          "max-xl:mb-0"
                        )}>
                          {categories.accessory.map((accessory) => (
                            <li key={accessory.id}>
                              <TabsTrigger
                                asChild
                                value={String(accessory.id)}
                                onMouseEnter={() => setActiveCategory(String(accessory.id))}
                              >
                                <Link
                                  className={cn(
                                    "flex items-center justify-start w-full gap-x-3 bg-white px-3 py-2 mb-0",
                                    "xl:font-semibold xl:!rounded-3xl",
                                    "max-xl:px-0 max-xl:gap-x-2",
                                    String(accessory.id) === activeCategory ? "xl:!bg-[var(--gray)] xl:!text-[var(--violet)] !shadow-none" : "text-black"
                                  )}
                                  href={`/catalog/${accessory.slug}`}
                                  onClick={handleLinkClick}
                                >
                                  {accessory.name}
                                </Link>
                              </TabsTrigger>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </TabsList>

                    <div
                      className={cn(
                        "flex flex-col items-center p-3 w-full bg-[var(--gray)] rounded-3xl",
                        "max-xl:hidden"
                      )}>
                      <p className={"text-center font-semibold px-10 mb-3 text-sm"}>
                        Продемонстрируем работу оборудования
                      </p>
                      <DemoBtn title={'Демонстрация онлайн'} className={"rounded-3xl w-full"}/>
                    </div>
                  </div>

                  <div className={cn(
                    "flex-1",
                    "max-xl:hidden"
                  )}>
                    {categories.product.map((category) => (
                      <TabsContent
                        asChild key={category.id}
                        value={String(category.id)}
                      >
                        <div className={'flex-1 max-h-[85dvh] overflow-y-auto pr-3 pb-10 pl-1'}>
                          <p className={"text-3xl font-semibold mb-5"}>{category.name}</p>
                          <div className={"flex justify-between mb-3"}>
                            <p className={"text-sm"}>{category.description}</p>
                            <Link onClick={() => setIsSpoilerOpen(false)} href={`/catalog/${category.slug}`}>
                              <Button
                                className={cn(
                                  "block rounded-3xl bg-[var(--violet-dark)] text-[var(--violet)]",
                                  "hover:text-white"
                                )}
                              >
                                Смотреть все
                              </Button>
                            </Link>
                          </div>

                          <ul className="grid grid-cols-3 gap-2">
                            {category.products.slice(0, 18).map((product) => (
                              <li key={product.id}>
                                <ProductCardHeader
                                  onClick={() => setIsSpoilerOpen(false)}
                                  {...product}
                                  currentCategorySlug={category.slug}
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
                              <Button
                                className={cn(
                                  "block rounded-3xl bg-[var(--violet-dark)] text-[var(--violet)]",
                                  "hover:text-white"
                                )}
                              >
                                Смотреть все
                              </Button>
                            </Link>
                          </div>

                          <ul className="grid grid-cols-4 gap-2">
                            {accessory.products.slice(0, 18).map((item) => (
                              <li key={item.id}>
                                <ProductCardHeader
                                  onClick={() => setIsSpoilerOpen(false)}
                                  {...item}
                                  currentCategorySlug={accessory.slug}
                                  inStock={Boolean(item.inStock)}
                                />
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
