import {Container} from "@/components/shared/Container";

import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/Carousel";
import React from "react";
import {cn} from "@/lib/utils";
import {ProductCard} from "@/components/shared/products/Product-card";
import {ClassName} from "@/types/types";
import {getAllProducts} from "@/api/products";

export const NewProductsSlider: React.FC<ClassName> = async ({className}) => {
  const products = await getAllProducts();

  return (
    <section className={cn('py-10', className)}>
      <Container>
        <h2 className={cn("text-2xl font-bold text-center mb-5")}>Новинки оборудования InfoLaser</h2>

        <Carousel
          opts={{
            // loop: true,
            align: "start",
          }}
        >
          <CarouselContent className=" py-5 -ml-10 max-sm:-ml-2">
            {products.map((product) => (
              <CarouselItem
                key={product.id}
                className="basis-1/4 pl-10 max-2xl:basis-1/3 max-lg:basis-1/2 max-sm:basis-1/1 max-sm:pl-2 "
              >
                <ProductCard
                  id={product.id}
                  name={product.name}
                  slug={product.slug}
                  stockPrice={product.stockPrice}
                  orderPrice={product.orderPrice}
                  categorySlug={product.categorySlug}
                  categoryName={product.categoryName}
                  description={product.description}
                  newPrice={0}
                  image={product.images?.[0]}
                  inStock={product.inStock}
                  isHit={product.isHit}
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className={cn('-left-[40px] max-2xl:-left-[20px]', className)}/>
          <CarouselNext className={cn('-right-[40px] max-2xl:-right-[20px]', className)}/>
        </Carousel>
      </Container>
    </section>

  );
};
