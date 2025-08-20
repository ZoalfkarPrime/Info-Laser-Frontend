'use client';

import React, {useState} from "react";
import {cn} from "@/lib/utils";
import {ClassName} from "@/types/types";
import {Input} from "@/components/ui/Input";
import {Textarea} from "@/components/ui/Textarea";
import PhoneInput from 'react-phone-input-2';
import {Button} from "@/components/ui/Button";
import {PersonalAgreement} from "@/components/shared/PersonalAgreement";

export const CartForm: React.FC<ClassName> = ({className}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
            <Textarea className={"rounded-3xl bg-white"} id={"comment"} placeholder="Введите комментарий"/>
          </li>
        </ul>
        <PersonalAgreement btnName={"Оформить предзаказ"}/>
        <Button
          variant={"violet"}
          className={cn(
            "w-full"
          )}
        >
          Оформить предзаказ
        </Button>
      </form>
    </div>
  );
};
