"use client";

import React, {useEffect, useState} from "react";
import {Container} from "@/components/shared/Container";
import {cn} from "@/lib/utils";
import Link from "next/link";
import {Overlay} from "@/components/shared/Overlay";
import {ChevronDown} from "lucide-react";
import {Category} from "@/types/category";
import {useMedia} from "react-use";
import {getCategories} from "@/api/api";
import Image from "next/image";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/Tabs";
import {Button} from "@/components/ui/Button";
import {ProductCard} from "@/components/shared/products/Product-card";
import {DemoBtn} from "@/components/shared/btns/Demo-btn";

export const HeaderProductItem: React.FC = () => {

  const isMobile = useMedia("(max-width: 1280px)");

  const [categories, setCategories] = useState<Category[]>([]);
  const [isSpoilerOpen, setIsSpoilerOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const accessories = [
    {
      id: "77",
      name: "Комплектующие для лазерных станков",
      description: "Описание для Комплектующие для лазерных станков",
      products: [
        {
          id: "7",
          name: "Чиллеры и системы охлаждения лазерных трубок",
          image: "https://infolaser.ru/assets/cache_image/img/upload/infolazer-laser-app_170x170_1ad.jpg",
          slug: "dlya-lazernyh-stankov",
        },
        {
          id: "8",
          name: "Лазерные трубки, СО2 трубки",
          image: "https://infolaser.ru/assets/cache_image/img/upload/infolazer-tube-app_170x170_1ad.jpg",
          slug: "dlya-lazernyh-stankov",
        },
        {
          id: "9",
          name: "test 3",
          image: "https://infolaser.ru/assets/cache_image/img/upload/infolazer-tube-app_170x170_1ad.jpg",
          slug: "dlya-lazernyh-stankov",
        },
        {
          id: "10",
          name: "Test 4",
          image: "https://infolaser.ru/assets/cache_image/img/upload/infolazer-tube-app_170x170_1ad.jpg",
          slug: "dlya-lazernyh-stankov",
        },
        {
          id: "11",
          name: "test 5",
          image: "https://infolaser.ru/assets/cache_image/img/upload/infolazer-tube-app_170x170_1ad.jpg",
          slug: "dlya-lazernyh-stankov",
        },
      ],
    },
    {
      id: "78",
      name: "Комплектующие для маркеров",
      description: "Описание для Комплектующие для маркеров",
      slug: "dlya-markerov",
      products: [
        {
          id: "12",
          name: "Контроллеры",
          image: "https://infolaser.ru/assets/cache_image/img/upload/infolazer-display-app_170x170_1ad.jpg",
          slug: "dlya-markerov",
        },
        {
          id: "13",
          name: "Линзы",
          image: "https://infolaser.ru/assets/cache_image/img/upload/infolazer-linza-app_170x170_1ad.jpg",
          slug: "dlya-markerov",
        },
        {
          id: "14",
          name: "Test 5",
          image: "https://infolaser.ru/assets/cache_image/img/upload/infolazer-linza-app_170x170_1ad.jpg",
          slug: "dlya-markerov",
        },
        {
          id: "15",
          name: "Test 6",
          image: "https://infolaser.ru/assets/cache_image/img/upload/infolazer-linza-app_170x170_1ad.jpg",
          slug: "dlya-markerov",
        },
        {
          id: "16",
          name: "Test 7",
          image: "https://infolaser.ru/assets/cache_image/img/upload/infolazer-linza-app_170x170_1ad.jpg",
          slug: "dlya-markerov",
        },
      ],
    },
  ];

  useEffect(() => {
    getCategories()
      .then((data) => {
        setCategories(data);
        if (data.length > 0) {
          setActiveCategory(data[0].id);
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
        <Link
          href={"/catalog"}
          type="button"
          className={cn(
            "relative flex items-center gap-x-1 rounded-md xl:bg-gray-400/30 hover:text-[#6941f9] transition-colors duration-300 px-3 lg:py-1",
            "max-xl:w-full max-xl:justify-between max-xl:font-bold max-xl:px-2",
            isSpoilerOpen ? "lg:before:content-[] lg:before:absolute lg:before:left-0 lg:before:bottom-[-40px] lg:before:h-[40px] lg:before:w-full" : "",
            isSpoilerOpen ? "text-[#6941f9] xl:bg-gray-400/50 " : "",
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
        </Link>

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
                          {categories.map((category) => (
                            <li key={category.id}>
                              <TabsTrigger
                                asChild
                                value={category.id}
                                onMouseEnter={() => setActiveCategory(category.id)}
                              >

                                <Link
                                  className={cn(
                                    "flex items-center justify-start w-full gap-x-3 font-semibold bg-white rounded-lg px-3 py-2 mb-0",
                                    activeCategory && 'bg-inherit',
                                  )}
                                  href={`/catalog/${category.slug}`}
                                  onClick={() => setIsSpoilerOpen(false)}
                                >
                                  <Image src={category.imageUrl} alt={"#"} width={45} height={45}/>
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
                          {accessories.map((accessory) => (
                            <li key={accessory.id}>
                              <TabsTrigger
                                asChild
                                value={accessory.id}
                                onMouseEnter={() => setActiveCategory(accessory.id)}
                              >
                                <Link
                                  className={cn(
                                    "flex items-center justify-start w-full gap-x-3 font-semibold bg-white rounded-lg px-3 py-2 mb-0",
                                    activeCategory && 'bg-inherit',
                                  )}
                                  href={`/accessories/${accessory.slug}`}
                                  onClick={() => setIsSpoilerOpen(false)}
                                >
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
                    {categories.map((category) => (
                      <TabsContent asChild key={category.id} value={category.id}>
                        <div className={'flex-1 overflow-y-scroll'}>
                          <p className={"text-2xl"}>{category.name}</p>
                          <div className={"flex justify-between mb-3"}>
                            <p>{category.description}</p>
                            <Link onClick={() => setIsSpoilerOpen(false)} href={`/catalog/${category.slug}`}>
                              <Button className={"block rounded-2xl"}> Смотреть все</Button>
                            </Link>
                          </div>

                          <ul className="grid grid-cols-3 gap-2">
                            {category.products.map((product) => (
                              <li key={product.id}>
                                <ProductCard {...product} image={product.images?.[0]}/>
                              </li>
                            ))}
                          </ul>

                        </div>
                      </TabsContent>
                    ))}

                    {accessories.map((accessory) => (
                      <TabsContent asChild key={accessory.id} value={accessory.id}>
                        <div className={'flex-1 overflow-y-scroll'}>
                          <p className={"text-2xl"}>{accessory.name}</p>
                          <div className={"flex justify-between mb-3"}>
                            <p>{accessory.description}</p>
                            <Link
                              onClick={() => setIsSpoilerOpen(false)}
                              href={`/accessories`}
                            >
                              <Button className={"block rounded-2xl"}> Смотреть все</Button>
                            </Link>
                          </div>

                          <ul className="grid grid-cols-4 gap-2">
                            {accessory.products.map((product) => (
                              <li key={product.id}>
                                <Link
                                  onClick={() => setIsSpoilerOpen(false)}
                                  className={"flex items-center gap-2 h-full bg-white rounded-xl leading-4 overflow-hidden p-2 hover:text-[#b82c2c] focus:text-[#b82c2c] transition-colors duration-300 ease-in-out"}
                                  href={"/accessories"}
                                >
                                  <Image src={product.image} alt={product.name} width={50} height={50}/>
                                  {product.name}
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
