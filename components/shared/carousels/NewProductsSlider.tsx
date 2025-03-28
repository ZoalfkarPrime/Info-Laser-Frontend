import React from "react";
import {Container} from "@/components/shared/Container";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/Carousel";
import {cn} from "@/lib/utils";
import {ProductCard} from "@/components/shared/products/ProductCard";
import {ClassName} from "@/types/types";
import {getProducts} from "@/api/api";

export const NewProductsSlider: React.FC<ClassName> = async ({className}) => {
  const products = await getProducts() ?? [];

  const newProducts = products.filter(product =>
    product.labels?.some(label => label.slug === "new")
  );

  return (
    <section className={cn("py-7", className)}>
      <Container>
        <h2 className={cn("text-4xl font-bold text-center mb-5")}>Новинки оборудования InfoLaser</h2>

        <Carousel opts={{align: "start"}}>
          <CarouselContent className="py-5 -ml-5 max-sm:-ml-2">
            {newProducts.map((product) => (
              <CarouselItem
                key={product.id}
                className="basis-1/4 pl-5 max-2xl:basis-1/3 max-lg:basis-1/2 max-sm:basis-1/1 max-sm:pl-2"
              >
                <ProductCard
                  {...product}
                  inStock={Boolean(product.inStock)}
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          {newProducts?.length >= 4 && (
            <>
              <CarouselPrevious className={cn('-left-[40px] max-2xl:-left-[20px]', className)}/>
              <CarouselNext className={cn('-right-[40px] max-2xl:-right-[20px]', className)}/>
            </>
          )}

        </Carousel>
      </Container>
    </section>
  );
};
