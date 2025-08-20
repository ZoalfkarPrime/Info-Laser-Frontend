'use client';

import React, {useState} from "react";
import {Button} from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import {cn} from "@/lib/utils";
import {ClassName} from "@/types/types";
import {Input} from "@/components/ui/Input";
import {Textarea} from "@/components/ui/Textarea";
import PhoneInput from "react-phone-input-2";
import {PersonalAgreement} from "@/components/shared/PersonalAgreement";

type CallbackBtnProps = {
  title: string;
} & ClassName;

export const DemoBtn: React.FC<CallbackBtnProps> = ({title, className}) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"violet"}
          className={cn(className)}
        >
          {title}
        </Button>
      </DialogTrigger>

      <DialogDescription className="hidden"></DialogDescription>

      <DialogContent className="max-w-[750px]">
        <DialogTitle className={"text-3xl max-md:text-2xl"}>Заявка на сервис</DialogTitle>
        <p className={"text-[var(--gray-text)] max-md:text-sm"}>Вы не нашли ответа на свой вопрос напишите нам</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label
              className={cn(
                "block basis-[250px] text-sm font-semibold dark:text-gray-300 after:content-['*'] after:text-red-500 after:ml-1 mb-2",
                "max-md:text-xs"
              )}
              htmlFor={"name"}
            >Ваше Имя:
            </label>
            <Input
              className={"rounded-3xl max-md:text-xs"}
              id={"name"} required type="text" placeholder="Имя" value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label
              className={cn(
                "block basis-[250px] text-sm font-semibold dark:text-gray-300 after:content-['*'] after:text-red-500 after:ml-1 mb-2",
                "max-md:text-xs"
              )}
              htmlFor={"tel"}
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
          </div>
          <div className="mb-5">
            <label
              className={cn(
                "block basis-[250px] text-sm font-semibold dark:text-gray-300 mb-2",
                "max-md:text-xs"
              )}
              htmlFor={"comment"}
            >
              Комментарий:
            </label>
            <Textarea className={"rounded-2xl max-md:text-xs"} id={"comment"} placeholder="Введите комментарий"/>
          </div>
          <PersonalAgreement btnName={"Отправить запрос"}/>
          <Button type="submit" className="mt-5">
            Отправить запрос
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
