"use client";

import React, {useState} from "react";
import {Container} from "@/components/shared/Container";
import {cn} from "@/lib/utils";
import Link from "next/link";
import {Product, OneProductCategory} from "@/types/types";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/Tabs";
import Image from "next/image";
import {Button} from "@/components/ui/Button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/Carousel";
import {ClassName} from "@/types/types";

interface UniqMachinesSliderProps extends ClassName {
  products: Product[];
}

export const UniqMachinesSlider: React.FC<UniqMachinesSliderProps> = ({className, products}) => {

  const uniqueCategories: OneProductCategory[] = Array.from(
    new Map(
      products.flatMap(product =>
        product.categories.map(cat => [cat.id, cat])
      )
    ).values()
  );

  const [activeCategory, setActiveCategory] = useState<string | null>(
    uniqueCategories.length > 0 ? String(uniqueCategories[0].id) : null
  );

  if (!activeCategory) return null;

  return (
    <section className={cn(
      "py-10",
      "max-md:overflow-hidden max-md:py-3",
      className
    )}>
      <Container>
        <h2 className={cn(
          "text-4xl font-bold text-center mb-5",
          "max-xl:text-3xl",
          "max-md:text-2xl"
        )}>
          Представляем самые передовые и универсальные машины
        </h2>

        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="flex flex-col">
          <TabsList className={cn("rounded-3xl")} asChild>
            <ul className={cn(
              "flex place-self-center gap-x-1 mb-3 h-auto rounded-3xl border border-[#ABB4D7]/10 bg-[#ABB4D7] py-1 px-2",
              "max-xl:place-self-start max-xl:justify-start max-xl:overflow-x-auto max-xl:overflow-y-hidden max-xl:max-w-full"
            )}>
              {uniqueCategories.map(category => (
                <li key={category.id}>
                  <TabsTrigger
                    value={String(category.id)}
                    className={cn(
                      "rounded-3xl px-3 py-2 mb-0 hover:cursor-pointer",
                      activeCategory === String(category.id)
                        ? "data-[state=active]:bg-[var(--violet)]/80 data-[state=active]:text-white"
                        : "text-black",
                      "max-xl:px-2"
                    )}
                  >
                    {category.name}
                  </TabsTrigger>
                </li>
              ))}
            </ul>
          </TabsList>

          {uniqueCategories.map(category => {
            const categoryProducts = products.filter(product =>
              product.category_ids.includes(category.id)
            );

            return (
              <TabsContent asChild key={category.id} value={String(category.id)}>
                <Carousel className={"max-md:[&>div]:overflow-visible"} opts={{align: "start"}}>
                  <CarouselContent className={cn(
                    "-ml-5",
                    "max-md:-ml-2"
                  )}>
                    {categoryProducts.map(product => (
                      <CarouselItem
                        key={product.id}
                        className={cn(
                          "basis-1/3 pl-5",
                          "max-xl:basis-1/2",
                          "max-md:basis-[85%] max-md:pl-2",
                        )}
                      >
                        <Link
                          href={`/catalog/${category.slug}/${product.slug}`}
                          className={cn(
                            "relative flex flex-col h-full bg-[var(--gray)] border border-[#ABB4D7]/10 p-5 rounded-3xl overflow-hidden group",
                            "max-md:rounded-[20px]"
                          )}
                        >
                          <div className="flex flex-col h-full z-20">
                            <p
                              className={cn(
                                "text-[var(--violet)] uppercase text-xs mb-3 group-hover:text-white",
                                "max-md:text-[10px] max-md:mb-2"
                              )}>
                              {product.laser_suppliers?.name || "Wattsan"}
                            </p>
                            <p className={cn(
                              "text-2xl leading-6 mb-5 group-hover:text-white",
                              "max-md:text-lg"
                            )}>
                              {product.name}
                            </p>

                            <ul className={cn(
                              "flex flex-wrap text-xs gap-2 mb-3 group-hover:text-white",
                              "max-md:text-[10px]"
                            )}>
                              {product.characteristics
                                ?.filter(c => Boolean(c.is_featured))
                                .map((c, idx) => (
                                  <li
                                    key={idx}
                                    className={cn("bg-gray-200 rounded-3xl px-3 py-1 group-hover:bg-white/20")}
                                  >
                                    {c.name} {c.value}
                                  </li>
                                ))}
                            </ul>

                            {product.product_attachments
                              ?.filter(a => a.is_main)
                              .map(a => (
                                <Image
                                  key={a.id}
                                  className="self-center mb-3 group-hover:opacity-0"
                                  src={a.external_url}
                                  alt={a.name}
                                  width={230}
                                  height={170}
                                />
                              ))}

                            <Button
                              className="place-self-start mt-auto"
                              variant={"violet"}
                            >
                              Узнать больше
                            </Button>
                          </div>

                          <video
                            autoPlay
                            playsInline
                            muted
                            loop
                            src="/video/ringcut-4.mp4"
                            width={230}
                            height={170}
                            className={cn(
                              "absolute top-0 left-0 w-full h-full object-cover z-[10] hidden group-hover:block pointer-events-none"
                            )}
                          />
                        </Link>
                      </CarouselItem>
                    ))}
                  </CarouselContent>

                  {categoryProducts.length >= 3 && (
                    <>
                      <CarouselPrevious
                        className={cn(
                          "-left-[40px]",
                          "max-xl:left-[20px]",
                          "max-md:left-[10px]",
                          className
                        )}/>
                      <CarouselNext className={cn(
                        "-right-[40px]",
                        "max-xl:right-[20px]",
                        "max-md:right-[10px]",
                        className
                      )}/>
                    </>
                  )}
                </Carousel>
              </TabsContent>
            );
          })}
        </Tabs>
      </Container>
    </section>
  );
};
