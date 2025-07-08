"use client"

import React, {useState} from "react";
import {cn} from "@/lib/utils";
import {ClassName} from "@/types/types";
import {Container} from "@/components/shared/Container";
import {Input} from "@/components/ui/Input";
import {Textarea} from "@/components/ui/Textarea";
import PhoneInput from "react-phone-input-2";
import {Button} from "@/components/ui/Button";
import {PersonalAgreement} from "@/components/shared/PersonalAgreement";

export const IndividualRequestForm: React.FC<ClassName> = ({className}) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className={cn(
      "bg-[var(--gray)] py-15 max-lg:py-7",
      className
    )}>
      <Container>
        <div className={cn(
          "grid grid-cols-12"
        )}>
          <div className={"col-start-1 col-end-4 max-lg:col-span-full max-lg:mb-5 max-md:mb-3"}>
            <h2 className={cn("text-4xl font-semibold mb-5 max-lg:text-2xl max-md:mb-2")}>Индивидуальный запрос</h2>
            <p className={cn("text-[var(--gray-text)] max-md:text-sm")}>Вы не нашли ответа на свой вопрос напишите
              нам.</p>
          </div>

          <form className="col-start-6 col-end-13 space-y-4 max-lg:col-span-full" onSubmit={handleSubmit}>
            <ul className={"grid grid-col-12 gap-5 max-md:gap-0 max-md:gap-y-3"}>
              <li className="col-start-1 col-end-6 max-md:col-start-1 max-md:col-end-13">
                <label
                  className="block text-sm font-semibold after:content-['*'] after:text-red-500 after:ml-1 mb-2 max-md:text-xs"
                  htmlFor={"name"}
                >
                  Ваше Имя:
                </label>
                <Input
                  className={"rounded-3xl bg-white max-md:text-sm"}
                  id={"name"} required type="text" placeholder="Имя" value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </li>
              <li className="col-start-6 col-end-13 max-md:col-start-1 max-md:col-end-13">
                <label
                  className="block text-sm font-semibold after:content-['*'] after:text-red-500 after:ml-1 mb-2 max-md:text-xs"
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
              <li className="col-start-1 col-end-13">
                <label
                  className="block text-sm font-semibold dark:text-gray-300 mb-2 max-md:text-xs"
                  htmlFor={"comment"}
                >
                  Комментарий:
                </label>
                <Textarea
                  className={"rounded-2xl bg-white max-md:text-sm"}
                  id={"comment"}
                  placeholder="Введите комментарий"
                />
              </li>
            </ul>
            <PersonalAgreement/>
            <Button type="submit" className="p-5 rounded-3xl max-md:text-xs">
              Отправить запрос
            </Button>
          </form>
        </div>
      </Container>
    </section>
  );
};
