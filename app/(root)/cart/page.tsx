'use client'

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {useCart} from "@/context/CartContext";
import {Container} from "@/components/shared/Container";
import {Check, Clock3, Minus, Plus, Trash2} from "lucide-react";
import {cn, formatPrice} from "@/lib/utils";
import {Product} from "@/types/types";
import {Button} from "@/components/ui/Button";
import {CartForm} from "@/components/shared/forms/CartForm";

const CartPage = () => {
  const {cart, updateQuantity, removeFromCart, clearCart} = useCart();

  const totalPrice = cart.reduce((sum, item) => sum + (item.quantity ?? 1) * item.orderPrice, 0);
  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <section>
      <Container>
        <h1 className="text-3xl mb-6">Корзина</h1>

        {cart.length === 0 ? (
          <p>Корзина пуста</p>
        ) : (
          <div className={cn("grid grid-cols-12 gap-5")}>
            <ul className={cn("col-start-1 col-end-10 flex flex-col space-y-3")}>

              {cart.map((item: Product) => (
                <li
                  key={item.id}
                  className={cn(
                    "grid grid-cols-12 auto-rows-auto items-center bg-[var(--gray)] p-3 rounded-3xl",
                  )}
                >

                  <div className={"col-start-1 col-end-7 flex gap-x-5"}>
                    {/* Изображение */}
                    <div className="flex-shrink-0 overflow-hidden w-[100px] h-[90px] flex items-center justify-center">
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
                            className="inline-flex items-center gap-x-1 place-self-start text-xs text-[var(--violet)] bg-[var(--violet-dark)] rounded-2xl p-2 mb-3 leading-none"
                          >
                          <Check className="text-[var(--violet)]" size={12}/>
                          В наличии
                        </span>
                        ) :
                        (
                          <span
                            className="inline-flex items-center gap-x-1 place-self-start text-xs text-[var(--green)] bg-[var(--green)] rounded-2xl p-2 mb-3 leading-none"
                          >
                          <Clock3 className='text-[var(--green)]' size={12}/>
                          Под заказ
                        </span>
                        )
                      }

                      {/* Название (ссылка) */}
                      <Link
                        href={`/catalog/${item.categories?.[0]?.slug ?? "default-category"}/${item.slug}`}
                        className="leading-4 hover:text-[var(--violet)] focus:text-[var(--violet)] transition-colors font-semibold"
                      >
                        {item.name}
                      </Link>
                    </div>
                  </div>

                  {/* Цена */}
                  <div className={"col-start-7 col-end-10"}>
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
                  <div className="col-start-10 col-end-12 flex justify-center gap-3">
                    <button
                      onClick={() => updateQuantity(item.id, (item.quantity ?? 1) - 1)}
                      disabled={item.quantity === 1}
                      className={cn(
                        "flex items-center justify-center w-[25px] h-[25px] bg-[var(--violet-dark)] text-[var(--violet)] rounded-full transition",
                        "hover:bg-[var(--violet)] hover:text-white hover:cursor-pointer",
                        "disabled:opacity-50 disabled:cursor-not-allowed"
                      )}
                    >
                      <Minus size={17}/>
                    </button>
                    <span className="text-center">{item.quantity ?? 1}</span>
                    <button
                      onClick={() => updateQuantity(item.id, (item.quantity ?? 1) + 1)}
                      className={cn(
                        "flex items-center justify-center w-[25px] h-[25px] bg-[var(--violet-dark)] text-[var(--violet)] rounded-full transition ",
                        "hover:bg-[var(--violet)] hover:text-white hover:cursor-pointer"
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
                      "hover:text-red-500 hover:cursor-pointer"
                    )}
                  >
                    <Trash2 size={17}/>
                  </button>
                </li>
              ))}

              <Button
                className={"place-self-end rounded-3xl bg-red-500"}
                onClick={clearCart}
              >
                Очистить корзину
              </Button>
            </ul>

            <CartForm className={"col-start-1 col-end-10"}/>

            <div className={cn("col-start-10 col-end-13 row-start-1 bg-[var(--gray)] p-5 rounded-3xl h-max")}>
              <Button className={cn("rounded-3xl mb-3 w-full py-6")}>Оформить предзаказ</Button>
              <Button variant="outline" asChild className={cn("rounded-3xl bg-[var(--violet-dark)] w-full py-6")}>
                <Link href={"#"}>Рассрочка</Link>
              </Button>
              <p
                className={"flex justify-between border-b border-b-[#9298AF26] py-5 text-[var(--gray-text)] text-sm mb-5"}>
                Товары ({totalCartItems})
                <b className={"font-normal"}>{formatPrice(totalPrice)} ₽</b>
              </p>
              <p className={"flex justify-between text-[var(--gray-text)] font-semibold"}>
                Итого
                <b className={"text-black"}>{formatPrice(totalPrice)} ₽</b>
              </p>
            </div>
          </div>

        )}
      </Container>
    </section>
  );
};

export default CartPage;
