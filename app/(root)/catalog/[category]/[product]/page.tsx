import React from "react";
import {Container} from "@/components/shared/Container";
import {getOneProductBySlug} from "@/api/api";
import {cn} from "@/lib/utils";
import {ProductGallerySlider} from "@/components/shared/carousels/Product/ProductGallerySlider";
import {AllCharacteristicsBtn} from "@/components/shared/btns/AllCharacteristicsBtnProduct";

interface PageProps {
  params: Promise<{ product: string; category: string }>;
}

const ProductPage: React.FC<PageProps> = async ({params}) => {
  const {product: productSlug} = await params;
  const product = await getOneProductBySlug(productSlug);

  if (!product) {
    return (
      <Container>
        <p>Продукт не найден</p>
      </Container>
    );
  }

  const machineSpecs = [
    {label: "Мощность лазера", value: "40 Вт"},
    {label: "Тип станка", value: "Настольный"},
    {label: "Макс. резка", value: "До 100 мм/с"},
    {label: "Охлаждение лазерной трубки", value: "Водяное"},
    {label: "Рабочее поле", value: "200х300 мм"},
    {label: "Срок службы трубки", value: "1550 ч"},
    {label: "Макс. гравировка", value: "До 100 мм/с"},
    {label: "Блок розжига", value: "Myjg 40"},
  ];

  return (
    <section>
      <Container>
        <div className="flex gap-8 mt-10">
          <ProductGallerySlider images={product.product_attachments ?? []}/>
          <div className="flex-1">
            <div className={"mb-5"}>
              <h1 className={cn("text-3xl font-bold")}>
                {product.name}
              </h1>
              <p>{product.description}</p>
            </div>

            <div>
              <dl className="flex gap-x-10 text-[14px] mb-3">
                {[0, 1].map((i) => (
                  <div key={i} className="flex-1">
                    {machineSpecs
                      .filter((_, index) => index % 2 === i)
                      .map((spec, index) => (
                        <div key={index} className="flex items-end">
                          <dt
                            className={cn(
                              "flex-1 relative overflow-hidden z-30",
                              "after:content-[''] after:absolute after:bottom-1 after:w-[80%] after:h-px after:border-b after:border-dotted after:border-gray-400 after:z-20"
                            )}
                          >
                            {spec.label}
                          </dt>
                          <dd className="relative bg-white text-right z-30">
                            {spec.value}
                          </dd>
                        </div>
                      ))}
                  </div>
                ))}
              </dl>
              <AllCharacteristicsBtn/>
            </div>
          </div>
        </div>


        <section id="specifications" className={"mt-52"}>
          <h2 className={"text-3xl mb-3"}>Характеристики</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur,
            culpa eius fugit ipsam, labore minus nesciunt odio officia
            praesentium quasi, ratione recusandae sed tempore totam vel!
            Excepturi reprehenderit, voluptatum? Asperiores consequatur cum dicta
            error, expedita fugiat harum hic in ipsum labore maxime
            necessitatibus neque nesciunt, obcaecati optio pariatur porro quasi
            rem suscipit voluptates. Ab accusantium animi asperiores aspernatur,
            culpa dolor, dolore error harum illo laudantium minima molestiae
            neque nihil odit officiis porro provident quas, quo quod sequi
            similique sint temporibus ut velit voluptate? Assumenda, aut deserunt
            dolorum ex hic illo iure iusto perferendis quidem quos ratione
            recusandae rerum sit, voluptates?
          </p>
        </section>
      </Container>
    </section>
  );
};

export default ProductPage;
