'use client'

import React, {useEffect, useState} from "react";
import Link from "next/link";
import Image from "next/image";
import {useCart} from "@/context/CartContext";
import {Container} from "@/components/shared/Container";
import {Check, Clock3, Minus, Plus, Trash2} from "lucide-react";
import {cn, formatPrice} from "@/lib/utils";
import {Product} from "@/types/types";
import {Button} from "@/components/ui/Button";
import {CartForm} from "@/components/shared/forms/CartForm";
import {OfflineOrOnlineMain} from "@/components/shared/banners/OfflineOrOnlineMain";

const CartPage = () => {
  const {cart, updateQuantity, removeFromCart, clearCart} = useCart();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const totalPrice = cart.reduce((sum, item) => sum + (item.quantity ?? 1) * item.orderPrice, 0);
  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1 && value <= 100) {
      updateQuantity(id, value);
    }
  };

  return (
    <section>
      <Container>
        <h1
          className={cn(
            "text-5xl font-semibold mb-6",
            "max-xl:text-4xl max-xl:mb-5",
            "max-md:text-3xl"
          )}
        >
          Корзина
        </h1>

        {
          isLoading ? (
              <div className="text-center py-20 text-xl text-[var(--gray-text)]">Загрузка корзины...</div>
            ) :
            cart.length === 0 ? (
              <div className={"flex items-center justify-center flex-col gap-10 pb-30"}>
                <Image src={'/img/cart/empty-cart.jpg'} alt={"Пустая корзина"} width={270} height={483}/>
                <p
                  className={cn(
                    "text-4xl font-semibold text-[var(--gray-text)]",
                    "max-xl:text-3xl",
                    "max-md:text-2xl",
                  )}
                >
                  Ваша корзина пуста
                </p>
              </div>
            ) : (
              <div className={cn(
                "grid grid-cols-12 gap-5",
                "max-md:gap-0 max-md:gap-y-5"
              )}>
                <div className={cn(
                  "col-start-1 col-end-10",
                  "max-xl:col-span-full"
                )}>
                  <ul className={cn("flex flex-col space-y-3")}>

                    {cart.map((item: Product) => (
                      <li
                        key={item.id}
                        className={cn(
                          "grid grid-cols-12 auto-rows-auto items-center bg-[var(--gray)] p-3 rounded-3xl",
                          "max-md:gap-y-3"
                        )}
                      >

                        <div className={cn(
                          "col-start-1 col-end-6 flex gap-x-5",
                          "max-md:col-span-full"
                        )}>
                          {/* Изображение */}
                          <div
                            className={cn(
                              "flex-shrink-0 overflow-hidden w-[100px] h-[90px] flex items-center justify-center",
                              "max-md:w-[60px] max-md:h-[60px]"
                            )}>
                            {item.product_attachments && item.product_attachments.map((item) =>
                                Boolean(item && item.is_main) && (
                                  <Image
                                    key={item.id}
                                    className="hover:scale-110 transition-transform z-10 w-full h-full"
                                    src={item.external_url}
                                    alt={item.name}
                                    width={100}
                                    height={90}
                                  />
                                )
                            )}
                          </div>

                          {/* В наличии/под заказ + название */}
                          <div className={cn("flex flex-col")}>
                            {Boolean(item.inStock) ?
                              (
                                <span
                                  className="inline-flex items-center gap-x-1 place-self-start text-xs text-[var(--violet)] bg-[var(--violet-dark)] rounded-2xl p-2 mb-3 leading-none max-md:text-[10px]"
                                >
                          <Check className="text-[var(--violet)]" size={12}/>
                          В наличии
                        </span>
                              ) :
                              (
                                <span
                                  className="inline-flex items-center gap-x-1 place-self-start text-xs text-[var(--green)] bg-[var(--green)] rounded-2xl p-2 mb-3 leading-none max-md:text-[10px]"
                                >
                          <Clock3 className='text-[var(--green)]' size={12}/>
                          Под заказ
                        </span>
                              )
                            }

                            {/* Название (ссылка) */}
                            <Link
                              href={`/catalog/${item.categories?.[0]?.slug ?? "default-category"}/${item.slug}`}
                              className="leading-4 hover:text-[var(--violet)] focus:text-[var(--violet)] transition-colors font-semibold max-md:text-sm"
                            >
                              {item.name}
                            </Link>
                          </div>
                        </div>

                        {/* Цена */}
                        <div className={cn(
                          "col-start-6 col-end-8",
                          "max-md:col-span-full"
                        )}>
                          <p className={"text-xs"}>Под заказ без НДС</p>
                          <div className={cn("flex items-center gap-x-2")}>
                            <b className="text-[18px]">{formatPrice(item.orderPrice)} ₽</b>

                            {item.labels?.some((label) => label.slug === "in_sale") && (
                              <div className="inline-block bg-black/7 px-2 py-1 rounded-3xl">
                                <b className="text-sm font-normal line-through">{formatPrice(item.newPrice)} ₽</b>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Количество */}
                        <div className={cn(
                          "col-start-9 col-end-11 flex justify-center items-center gap-3",
                          "max-md:col-start-1 max-md:col-end-6 max-md:justify-start"
                        )}>
                          <button
                            onClick={() => updateQuantity(item.id, (item.quantity ?? 1) - 1)}
                            disabled={item.quantity === 1}
                            className={cn(
                              "flex items-center shrink-0 justify-center w-[25px] h-[25px] bg-[var(--violet-dark)] text-[var(--violet)] rounded-full transition",
                              "hover:bg-[var(--violet)] hover:text-white hover:cursor-pointer",
                              "disabled:opacity-50 disabled:cursor-not-allowed"
                            )}
                          >
                            <Minus size={17}/>
                          </button>
                          <input
                            type="number"
                            min={1}
                            max={100}
                            value={item.quantity ?? 1}
                            onChange={(e) => handleQuantityChange(e, item.id)}
                            className={cn(
                              "text-center border border-gray-300 rounded-2xl px-1 py-0.5 max-w-[60px]",
                              "focus:outline-none focus:border-[var(--violet)]"
                            )}
                          />
                          <button
                            onClick={() => {
                              if ((item.quantity ?? 1) < 100) {
                                updateQuantity(item.id, (item.quantity ?? 1) + 1);
                              }
                            }}
                            disabled={(item.quantity ?? 1) >= 100}
                            className={cn(
                              "flex items-center shrink-0 justify-center w-[25px] h-[25px] bg-[var(--violet-dark)] text-[var(--violet)] rounded-full transition",
                              "hover:bg-[var(--violet)] hover:text-white hover:cursor-pointer",
                              "disabled:opacity-50 disabled:cursor-not-allowed"
                            )}
                          >
                            <Plus size={17}/>
                          </button>
                        </div>

                        {/* Удаление */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className={cn(
                            "col-start-12 col-end-13 flex justify-center items-center w-10 h-10 bg-[#FF00001A] rounded-full transition-colors",
                            "hover:text-red-500 hover:cursor-pointer",
                            "max-md:col-start-10 max-md:col-end-13"
                          )}
                        >
                          <Trash2 size={17}/>
                        </button>
                      </li>
                    ))}
                  </ul>

                  <div
                    className={cn(
                      "flex justify-between items-center border-b border-b-[#9298AF26] py-5",
                      "max-md:flex-col max-md:items-start max-md:gap-y-3"
                    )}
                  >
                    <p
                      className={"flex gap-x-3 text-[var(--gray-text)] text-sm"}>
                      Товары ({totalCartItems})
                      <b className={"font-normal text-black"}>{formatPrice(totalPrice)} ₽</b>
                    </p>

                    <div className={cn(
                      "flex gap-x-5 items-center",
                      "max-md:flex-col max-md:gap-y-3 max-md:items-start"
                    )}>
                      <p className={"flex gap-x-3 justify-between text-[var(--gray-text)] font-semibold"}>
                        Итого
                        <b className={"text-black"}>{formatPrice(totalPrice)} ₽</b>
                      </p>

                      <Button
                        className={"rounded-3xl bg-red-500 hover:bg-red-700 focus:bg-red-700"}
                        onClick={clearCart}
                      >
                        Очистить корзину
                      </Button>
                    </div>
                  </div>

                  <OfflineOrOnlineMain
                    className={cn(
                      "[&>div]:px-0 [&>div>div]:justify-end [&>div>div]:pr-[18px] [&>div>div>div]:max-w-[350px]",
                      "max-xl:hidden"
                    )}
                  />
                </div>

                <CartForm className={cn(
                  "col-start-10 col-end-13 max-h-fit",
                  "max-xl:col-span-full"
                )}/>
              </div>
            )}
      </Container>
    </section>
  );
};

export default CartPage;
