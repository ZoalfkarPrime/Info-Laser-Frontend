import React from "react";
import {Container} from "@/components/shared/Container";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/Carousel";
import {cn} from "@/lib/utils";
import {ProductCard} from "@/components/shared/products/ProductCard";
import {ClassName, Product} from "@/types/types";

type SimilarProductsSliderProps = ClassName & {
  products: Product[];
};

export const SimilarProductsSlider: React.FC<SimilarProductsSliderProps> = ({className, products}) => {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className={cn("py-7 max-xl:overflow-hidden max-md:py-5", className)}>
      <Container>
        <h2 className="text-4xl font-bold text-center mb-5 max-xl:text-3xl max-md:text-2xl max-md:mb-3">
          Похожие станки
        </h2>

        <Carousel className={cn("max-xl:[&>div]:overflow-visible")} opts={{align: "start"}}>
          <CarouselContent className="-ml-5 max-md:-ml-2">
            {products.map((product) => (
              <CarouselItem
                key={product.id}
                className={cn(
                  "basis-1/4 pl-5",
                  "max-xl:basis-[38%]",
                  "max-md:basis-[80%]",
                  "max-md:pl-2"
                )}
              >
                <ProductCard
                  {...product}
                  inStock={Boolean(product.inStock)}
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          {products.length >= 4 && (
            <>
              <CarouselPrevious className={cn(
                "-left-[30px]",
                "max-xl:left-[20px]",
                "max-md:left-[10px]",
                className
              )}/>
              <CarouselNext className={cn(
                "-right-[30px]",
                "max-xl:right-[20px]",
                "max-md:right-[10px]",
                className
              )}/>
            </>
          )}
        </Carousel>
      </Container>
    </section>
  );
};


