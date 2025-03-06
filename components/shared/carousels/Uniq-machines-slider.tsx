"use client";

import React, {useEffect, useState} from "react";
import {Container} from "@/components/shared/Container";
import {cn} from "@/lib/utils";
import Link from "next/link";
import {Category} from "@/types/category";
import {getCategories} from "@/api/api";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/Tabs";
import Image from "next/image";
import {Button} from "@/components/ui/Button";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/Carousel";
import {ClassName} from "@/types/types";

export const UniqMachinesSlider: React.FC<ClassName> = ({className}) => {

  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

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

  return (

    <section className={cn("py-10")}>

      <Container>
        <h2 className={"text-4xl font-bold text-center mb-5"}>Представляем самые передовые и универсальные машины</h2>
        {
          activeCategory ? (
            <Tabs value={activeCategory} onValueChange={setActiveCategory} className="flex flex-col">
              <TabsList
                className={cn("rounded-3xl")}
                asChild
              >
                <ul className={cn(
                  "flex place-self-center gap-x-1 mb-3 h-auto rounded-3xl border border-[#ABB4D7]/10 bg-[#ABB4D7] py-1 px-2",
                )}>
                  {categories.map((category) => (
                    <li key={category.id}>
                      <TabsTrigger
                        value={category.id}
                        className={cn(
                          "rounded-3xl  px-3 py-2 mb-0 hover:cursor-pointer",
                          activeCategory === category.id
                            ? "data-[state=active]:bg-[#4F26E9]/80 data-[state=active]:text-white"
                            : "text-black"
                        )}
                      >
                        {category.name}
                      </TabsTrigger>
                    </li>
                  ))}
                </ul>
              </TabsList>
              {categories.map((category) => (
                <TabsContent asChild key={category.id} value={category.id}>
                  <Carousel
                    opts={{
                      align: "start",
                    }}
                  >
                    <CarouselContent>
                      {category.products.map((product) => (
                        <CarouselItem key={product.id} className={"basis-1/3"}>

                          <Link
                            href={"/catalog/" + category.slug + "/" + product.slug}
                            className={cn(
                              "relative flex flex-col h-full bg-[#F8F9FD] border border-[#ABB4D7]/10 p-5 rounded-3xl overflow-hidden",
                              "group"
                            )}
                          >
                            <div className={"z-20"}>
                              <p className={"text-[#4F26E9] uppercase text-sm mb-3 group-hover:text-white"}>Wattsan</p>
                              <p className={"text-2xl leading-6 mb-5 group-hover:text-white"}>{product.name}</p>
                              <ul className={cn("flex flex-wrap text-sm gap-2 mb-3 group-hover:text-white")}>
                                <li
                                  className={cn("bg-gray-200 rounded-3xl px-3 py-1 group-hover:bg-white/20")}
                                >
                                  Рабочее поле 200x300 мм
                                </li>
                                <li
                                  className={cn("bg-gray-200 rounded-3xl px-3 py-1 group-hover:bg-white/20")}
                                >
                                  Мощность лазера 40 Вт
                                </li>
                                <li
                                  className={cn("bg-gray-200 rounded-3xl px-3 py-1 group-hover:bg-white/20")}
                                >
                                  Мелкосерийное производство
                                </li>
                              </ul>
                              <Image
                                src={product.images?.[0]?.url ?? product.image?.url ?? ''}
                                alt={product.name}
                                width={230}
                                height={170}
                                className={cn(
                                  "self-center mb-3",
                                  "group-hover:opacity-0"
                                )}
                              />
                              <Button className={"rounded-3xl place-self-start"}>Узнать больше</Button>
                            </div>

                            <video
                              src="/video/ringcut-4.mp4"
                              width={230}
                              height={170}
                              muted
                              loop
                              autoPlay
                              className={cn(
                                "absolute top-0 left-0 w-full h-full object-cover z-[10] hidden",
                                "group-hover:block"
                              )}
                            />
                          </Link>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    {category.products.length >= 3 && (
                      <>
                        <CarouselPrevious className={cn('-left-[40px] max-2xl:-left-[20px]', className)}/>
                        <CarouselNext className={cn('-right-[40px] max-2xl:-right-[20px]', className)}/>
                      </>
                    )}
                  </Carousel>
                </TabsContent>
              ))}
            </Tabs>
          ) : (<p>Загрузка...</p>)
        }
      </Container>
    </section>
  );
};