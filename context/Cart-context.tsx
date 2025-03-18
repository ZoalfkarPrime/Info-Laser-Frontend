'use client'

import React, {createContext, useContext, useEffect, useState} from "react";
import toast from "react-hot-toast";
import {Product} from "@/types/types";

// Тип корзины (массив товаров с количеством)
interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Хук для удобного доступа к контексту
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart должен использоваться внутри CartProvider");
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Загружаем корзину из LocalStorage при загрузке
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Сохраняем корзину в LocalStorage при изменении
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Добавить товар в корзину
  const addToCart = (product: Product) => {
    let message = "";

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      let updatedCart;

      if (existingItem) {
        updatedCart = prevCart.map((item) =>
          item.id === product.id ? {...item, quantity: item.quantity + 1} : item
        );
        message = `Количество ${product.name} увеличено в корзине`;
      } else {
        updatedCart = [...prevCart, {...product, quantity: 1}];
        message = `${product.name} добавлен в корзину`;
      }

      return updatedCart;
    });

    // Вызываем toast один раз после обновления состояния
    setTimeout(() => {
      toast.success(message);
    }, 0);
  };

  // Удалить товар из корзины
  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Обновить количество товара
  const updateQuantity = (id: number, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? {...item, quantity: Math.max(1, quantity)} : item
      )
    );
  };

  // Очистить корзину
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{cart, addToCart, removeFromCart, updateQuantity, clearCart}}>
      {children}
    </CartContext.Provider>
  );
};
