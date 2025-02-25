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

    <section className={cn("bg-gray-400/20 py-10")}>

      <Container>

        <h2 className={"text-3xl font-bold text-center mb-5"}>Представляем самые передовые и универсальные машины</h2>

        {
          activeCategory ? (
            <Tabs value={activeCategory} onValueChange={setActiveCategory} className="flex flex-col">
              <TabsList
                className={cn(
                  "rounded-3xl"
                )}
                asChild
              >
                <ul className={cn(
                  "flex place-self-center gap-x-1 mb-3 h-auto bg-white py-2 px-3",
                )}>
                  {categories.map((category) => (
                    <li key={category.id}>
                      <TabsTrigger
                        value={category.id}
                        className={cn(
                          "rounded-3xl  px-3 py-2 mb-0 hover:cursor-pointer",
                          activeCategory === category.id
                            ? "data-[state=active]:bg-gray-600 data-[state=active]:text-white"
                            : "bg-white text-black"
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
                          <div className={"flex flex-col h-full bg-white p-5 rounded-3xl"}>
                            <p className={"text-xl mb-2"}>{product.name}</p>
                            <ul className={cn("flex flex-wrap text-sm gap-2 mb-2")}>
                              <li className={cn("text-gray-500 bg-gray-200 rounded-xl px-3 py-1")}>Преимущество</li>
                              <li className={cn("text-gray-500 bg-gray-200 rounded-xl px-3 py-1")}>Преимущество</li>
                              <li className={cn("text-gray-500 bg-gray-200 rounded-xl px-3 py-1")}>Преимущество</li>
                              <li className={cn("text-gray-500 bg-gray-200 rounded-xl px-3 py-1")}>Преимущество</li>
                            </ul>
                            <Image
                              src={product.images?.[0]?.url ?? product.image?.url ?? ''}
                              alt={product.name}
                              width={230}
                              height={170}
                              className={"self-center mb-2"}
                            />
                            <Button asChild className={"rounded-3xl place-self-start"}>
                              <Link
                                href={`/catalog/${category.slug}/${product.slug}`}
                                className={""}
                              >
                                Узнать больше
                              </Link>
                            </Button>
                          </div>
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
