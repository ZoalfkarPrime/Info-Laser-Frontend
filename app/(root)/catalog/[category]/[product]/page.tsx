import React from "react";
import {Container} from "@/components/shared/Container";
import Image from "next/image";
import {ProductPageProps} from "@/types/product";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/Carousel";
import {ptMono} from "@/app/fonts";
import {cn} from "@/lib/utils";
import {getProductBySlug} from "@/api/api";

const ProductPage = async ({params}: ProductPageProps) => {
  const {product: productSlug} = await params;
  const product = await getProductBySlug(productSlug);

  if (!product) {
    return <Container><p>Продукт не найден</p></Container>;
  }

  return (
    <Container>
      <section className="flex gap-20 mt-10" key={product.id}>
        <Carousel opts={{loop: true}}>
          <CarouselContent className="max-w-[240px]">
            {product.images?.map((image, idx) => (
              <CarouselItem key={idx}>
                <Image
                  src={image.url}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-[40px]"/>
          <CarouselNext className="-right-[40px]"/>
        </Carousel>

        <div>
          <h1 className={cn(ptMono.className, "text-2xl font-bold")}>{product.name}</h1>
          <p>{product.description}</p>
        </div>
      </section>
    </Container>
  );
};

export default ProductPage;