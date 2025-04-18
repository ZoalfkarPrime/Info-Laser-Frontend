import React from "react";
import {Container} from "@/components/shared/Container";
import {getOneProductBySlug} from "@/api/api";
import {cn, formatPrice} from "@/lib/utils";
import {ProductGallerySlider} from "@/components/shared/carousels/product/ProductGallerySlider";
import {AllCharacteristicsBtn} from "@/components/shared/btns/AllCharacteristicsBtnProduct";
import {Star} from "lucide-react";
import {AddToCartBtnProduct} from "@/components/shared/btns/AddToCartBtnProduct";
import Link from "next/link";
import {PrePurchaseBtn} from "@/components/shared/btns/PrePurchaseBtn";
import {ProductBenefitSpoilers} from "@/components/shared/product/ProductBenefitSpoilers";

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

  return (
    <section>
      <Container>
        <div className="relative grid grid-cols-12 mt-10 gap-10">

          <div className="col-start-1 col-end-7 auto-rows-max">
            <ProductGallerySlider
              className={cn("sticky top-3")}
              images={product.product_attachments ?? []}
              labels={product.labels}
            />
          </div>

          <div className="col-start-7 col-end-13">

            {/* Информация о продукте */}
            <div className={cn("mb-7")}>
              <h1 className={cn("text-4xl font-bold mb-3")}>
                {product.name}
              </h1>

              <div className={cn("flex items-center justify-between gap-3 font-semibold")}>
                <p>{product.description}</p>
                <span className={cn("flex items-center gap-0.5")}>
                {Array.from({length: 5}).map((_, index) => (
                  <Star
                    key={index}
                    className="fill-[var(--gold)] last:mr-2"
                    strokeWidth={0}
                    size={12}
                  />
                ))}
                  {product.rating}
              </span>
              </div>
            </div>

            {/* Краткие характеристики */}
            {product.characteristics && (() => {
              // Сортируем: сначала is_featured, затем по order
              const sorted = [...product.characteristics].sort(
                (a, b) =>
                  Number(b.is_featured ?? 0) - Number(a.is_featured ?? 0) ||
                  Number(a.order ?? 0) - Number(b.order ?? 0)
              );

              // Берём только первые 8 характеристик
              const limited = sorted.slice(0, 8);

              // Делим на 2 колонки: 4 слева, 4 справа
              const midpoint = Math.ceil(limited.length / 2);
              const firstColumn = limited.slice(0, midpoint);
              const secondColumn = limited.slice(midpoint);

              return (
                <dl className="flex gap-x-10 text-sm mb-3">
                  {[firstColumn, secondColumn].map((column, i) => (
                    <div key={i} className="flex-1 space-y-1">
                      {column.map((spec, index) => (
                        <div key={index} className="flex items-end">
                          <dt
                            className={cn(
                              "flex-1 relative overflow-hidden text-[var(--gray-text)] z-30",
                              "after:content-[''] after:absolute after:bottom-1 after:w-[80%] after:h-px after:border-b after:border-dotted after:border-gray-400 after:z-20",
                              spec.is_featured ? "font-bold" : ""
                            )}
                          >
                            {spec.name}
                          </dt>
                          <dd
                            className={cn(
                              "relative bg-white text-right z-30",
                              spec.is_featured ? "font-bold" : ""
                            )}
                          >
                            {spec.value} {spec.unit}
                          </dd>
                        </div>
                      ))}
                    </div>
                  ))}
                </dl>
              );
            })()}

            <AllCharacteristicsBtn className={cn("mb-7")}/>

            {/* Цены товара */}
            <div className={cn("flex gap-2 justify-around mb-5")}>

              {Boolean(product.inStock) && (
                <>
                  <div className={cn("p-5 bg-[var(--gray)] rounded-3xl")}>
                    <span className={"text-sm"}>Цена без НДС</span>
                    <div className={cn("mb-5")}>
                      <b className="text-2xl">
                        {formatPrice(product.stockPrice)} ₽
                      </b>
                    </div>
                    <div className={cn("flex gap-2")}>
                      <AddToCartBtnProduct
                        product={product}
                      />

                      <Link
                        className={cn(
                          "text-[var(--violet)] bg-[var(--violet-dark)] rounded-3xl py-3 px-5 transition-colors",
                          "hover:text-white hover:bg-[var(--violet)]"
                        )}
                        href={"#"}
                      >
                        Рассрочка
                      </Link>
                    </div>
                  </div>
                </>
              )}

              <div className={cn("p-5 bg-[var(--gray)] rounded-3xl")}>
                <span className={"block text-sm mb-1"}>Под заказ без НДС</span>
                <div className={cn("flex items-center gap-3 mb-5")}>
                  <b className="text-2xl">
                    {formatPrice(product.orderPrice)} ₽
                  </b>
                  {product.labels?.some((label) => label.slug === "in_sale") && (
                    <div className={""}>
                      <span className="hidden">Акционная цена</span>
                      <div className="inline-block bg-black/7 px-2 py-1 rounded-3xl">
                        <b className="text-[15px] font-normal line-through">
                          {formatPrice(product.newPrice)} ₽
                        </b>
                      </div>
                    </div>
                  )}
                </div>

                <div className={cn("flex gap-2")}>
                  <PrePurchaseBtn title={"Предзаказ"}/>

                  <Link
                    className={cn(
                      "text-[var(--violet)] bg-[var(--violet-dark)] rounded-3xl py-3 px-5 transition-colors",
                      "hover:text-white hover:bg-[var(--violet)]"
                    )}
                    href={"#"}
                  >
                    Рассрочка
                  </Link>
                </div>
              </div>
            </div>

            {/* Баннер рассрочки */}
            <Link
              href={"#"}
              className={cn("block py-4 px-6 bg-[url('/img/product/banners/system-banner.jpg')] bg-no-repeat bg-cover rounded-3xl font-semibold mb-7")}
            >
              Собственная система рассрочки платежей
              <span
                className={cn("block font-normal text-xs mt-1")}>Компания Infolazer предоставляет своим клиентам рассрочку</span>
            </Link>

            {/* Спойлеры */}
            <ProductBenefitSpoilers/>
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
