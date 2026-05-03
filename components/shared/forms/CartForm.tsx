'use client';

import React, {useState} from "react";
import {cn} from "@/lib/utils";
import {ClassName} from "@/types/types";
import {Input} from "@/components/ui/Input";
import {Textarea} from "@/components/ui/Textarea";
import PhoneInput from 'react-phone-input-2';
import {Button} from "@/components/ui/Button";
import {PersonalAgreement} from "@/components/shared/PersonalAgreement";
import {useCart} from "@/context/CartContext";
import {apiClient} from "@/api/client";
import toast from "react-hot-toast";

export const CartForm: React.FC<ClassName> = ({className}) => {
  const {cart, clearCart} = useCart();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) {
      toast.error("Ваша корзина пуста");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        client_name: name,
        client_phone: phone.startsWith('+') ? phone : `+${phone}`,
        client_email: email,
        client_notes: notes,
        status: "pending",
        products: cart.map(item => ({
          product_id: item.id,
          quantity: item.quantity
        }))
      };

      const response = await apiClient.post("/api/order", payload);

      if (response.status === 200 || response.status === 201) {
        toast.success("Заказ успешно оформлен! Мы свяжемся с вами в ближайшее время.");
        clearCart();
        setName("");
        setEmail("");
        setPhone("");
        setNotes("");
      } else {
        throw new Error("Failed to submit order");
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      toast.error("Произошла ошибка при оформлении заказа. Пожалуйста, попробуйте позже.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={cn(
      "bg-[var(--gray)] p-7 rounded-3xl",
      "max-md:p-4",
      className
    )}>
      <p className={cn(
        "text-2xl font-semibold mb-5",
        "max-md:text-xl max-md:mb-3"
      )}>Личные данные</p>

      <form className="space-y-4" onSubmit={handleSubmit}>

        <ul className={cn(
          "grid grid-col-12 gap-5 auto-rows-auto",
          "max-md:gap-3"
        )}>
          <li className="">
            <label
              className="block text-sm font-semibold after:content-['*'] after:text-red-500 after:ml-1 mb-2"
              htmlFor={"name"}
            >
              Ваше Имя:
            </label>
            <Input
              className={"rounded-3xl bg-white"}
              id={"name"} required type="text" placeholder="Имя" value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isSubmitting}
            />
          </li>

          <li className="">
            <label
              className="block text-sm font-semibold after:content-['*'] after:text-red-500 after:ml-1 mb-2"
              htmlFor={"mail"}
            >
              Ваша эл. почта:
            </label>
            <Input
              className={"rounded-3xl bg-white"}
              id={"mail"} required type="email" placeholder="mail@mail.ru" value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
            />
          </li>

          <li className="">
            <label
              className="block text-sm font-semibold after:content-['*'] after:text-red-500 after:ml-1 mb-2"
              htmlFor="tel"
            >
              Телефон:
            </label>
            <PhoneInput
              country={'ru'}
              value={phone}
              onChange={(val) => setPhone(val)}
              disabled={isSubmitting}
              inputProps={{
                name: 'tel',
                required: true,
                id: 'tel',
              }}
              inputClass="!rounded-3xl !bg-white !p-3 !w-full !px-12 focus:!border-[var(--violet)] focus:!ring-0 focus:!outline-none"
              containerClass=""
              masks={{ru: '(...) ...-..-..'}}
              placeholder="+7 (___) ___-__-__"
            />
          </li>

          <li className="">
            <label
              className="block text-sm font-semibold dark:text-gray-300 mb-2"
              htmlFor={"comment"}
            >
              Комментарий:
            </label>
            <Textarea 
              className={"rounded-3xl bg-white"} 
              id={"comment"} 
              placeholder="Введите комментарий"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              disabled={isSubmitting}
            />
          </li>
        </ul>
        <PersonalAgreement btnName={"Оформить предзаказ"}/>
        <Button
          variant={"violet"}
          className={cn(
            "w-full"
          )}
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Оформление..." : "Оформить предзаказ"}
        </Button>
      </form>
    </div>
  );
};
