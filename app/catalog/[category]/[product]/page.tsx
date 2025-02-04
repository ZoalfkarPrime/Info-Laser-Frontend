import {Container} from "@/components/shared/Container";
import {getProductsBySlug} from "@/lib/api";
import Image from "next/image";
import {ProductPageProps} from "@/types/product";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/Carousel";
import React from "react";
import {ptMono} from "@/app/fonts";
import {cn} from "@/lib/utils";

const ProductPage = async ({params}: ProductPageProps) => {
  const {product} = await params;
  const products = await getProductsBySlug(product);

  return (
    <Container>
      {products.map((product) => (
        <section
          className="flex gap-20 mt-10"
          key={product.id}
        >

          <Carousel
            opts={{
              loop: true,
            }}
          >
            <CarouselContent className="max-w-[240px]">

              {product.images?.length && (
                product.images.map((image, idx) => (

                  <CarouselItem key={idx}>
                    <Image
                      src={image.url}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      className=""
                    />
                  </CarouselItem>)
                ))}

            </CarouselContent>

            <CarouselPrevious className="-left-[40px] bg-white border-gray-600 shadow-sm shadow-black"/>
            <CarouselNext className="-right-[40px] bg-white border-gray-600 shadow-sm shadow-black"/>
          </Carousel>

          <div>
            <h1 className={cn(ptMono.className, "text-2xl font-bold")}>{product.name}</h1>
            <p>{product.description}</p>
          </div>

        </section>
      ))}
    </Container>
  );
};

export default ProductPage;