'use client'

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {useCart} from "@/context/Cart-context";
import {Product} from "@/types/product";
import {Container} from "@/components/shared/Container";
import {Minus, Plus, Trash2} from "lucide-react";
import {cn} from "@/lib/utils";

const CartPage = () => {
  const {cart, updateQuantity, removeFromCart, clearCart} = useCart();

  const totalPrice = cart.reduce((sum, item) => sum + (item.quantity ?? 1) * item.orderPrice, 0);

  return (
    <section>
      <Container>
        <h1 className="text-3xl mb-6">Корзина</h1>

        {cart.length === 0 ? (
          <p>Корзина пуста</p>
        ) : (
          <>

            {cart.map((item: Product) => (
              <div key={item.id} className="grid grid-cols-4 gap-5 items-center py-2">

                <div className={"flex gap-x-5"}>
                  {/* Изображение */}
                  <div
                    className=" flex-shrink-0 bg-gray-300 rounded-2xl overflow-hidden w-[90px] h-[80px] flex items-center justify-center"
                  >
                    <Image
                      src={item.images?.[0]?.url ?? item.image?.url ?? ''}
                      alt={item.name}
                      width={60}
                      height={50}
                    />
                  </div>

                  {/* Название (ссылка) */}
                  <Link
                    href={`/catalog/${item.categorySlug}/${item.slug}`}
                    className="leading-4 hover:text-[#6941f9] focus:text-[#6941f9] transition-colors"
                  >
                    {item.name}
                  </Link>
                </div>


                {/* Цена за единицу */}
                <span className="text-center">
                  <b className={"mr-1"}>{item.orderPrice.toLocaleString()}</b>
                  ₽
                </span>

                {/* Количество */}
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => updateQuantity(item.id, (item.quantity ?? 1) - 1)}
                    disabled={item.quantity === 1}
                    className={cn(
                      "flex items-center justify-center w-[25px] h-[25px] bg-red-400 rounded-full transition",
                      "hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    )}
                  >
                    <Minus size={17}/>
                  </button>
                  <span className="text-center">{item.quantity ?? 1}</span>
                  <button
                    onClick={() => updateQuantity(item.id, (item.quantity ?? 1) + 1)}
                    className="flex items-center justify-center w-[25px] h-[25px] bg-green-400 rounded-full transition hover:bg-green-500"
                  >
                    <Plus size={17}/>
                  </button>
                </div>

                {/* Удаление */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="flex justify-center hover:text-red-500 transition"
                >
                  <Trash2 size={17}/>
                </button>
              </div>
            ))}

            {/* Итог */}
            <div className="flex justify-end gap-2 mt-5 text-xl font-bold">
              <p>Итого:</p>
              <p>{totalPrice.toLocaleString()}₽</p>
            </div>

            {/* Кнопка очистки */}
            <div className="flex justify-end mt-3">
              <button onClick={clearCart} className="text-red-500 hover:underline">
                Очистить корзину
              </button>
            </div>
          </>
        )}
      </Container>
    </section>
  );
};

export default CartPage;
