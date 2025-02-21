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
import {Checkbox} from "@/components/ui/Checkbox";
import {Input} from "@/components/ui/Input";
import {Textarea} from "@/components/ui/Textarea";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/Select";

type CallbackBtnProps = {
  title: string;
} & ClassName;

export const DemoBtn: React.FC<CallbackBtnProps> = ({title, className}) => {
  const [isChecked, setIsChecked] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={cn('', className)}>
          {title}
        </Button>
      </DialogTrigger>

      <DialogDescription className="hidden"></DialogDescription>

      <DialogContent className="max-w-[750px] lg:rounded-3xl">
        <DialogTitle className={"text-2xl"}>Заявка на сервис</DialogTitle>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex items-center">
            <label
              className="block basis-[250px] text-sm font-semibold dark:text-gray-300 after:content-['*'] after:text-red-500 after:ml-1"
              htmlFor={"name"}
            >Ваше Имя:
            </label>
            <Input
              className={"rounded-3xl"}
              id={"name"} required type="text" placeholder="Имя" value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex items-center">
            <label
              className="block basis-[250px] text-sm font-semibold dark:text-gray-300 after:content-['*'] after:text-red-500 after:ml-1"
              htmlFor={"mail"}
            >
              Ваша эл. почта:
            </label>
            <Input
              className={"rounded-3xl"}
              id={"mail"} required type="email" placeholder="mail@mail.ru" value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex items-center">
            <label
              className="block basis-[250px] text-sm font-semibold dark:text-gray-300 after:content-['*'] after:text-red-500 after:ml-1"
              htmlFor={"tel"}
            >
              Телефон:
            </label>
            <Input
              className={"rounded-3xl"}
              id={"tel"} required type="tel" placeholder="+7 (___) ___ - __ - ___"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="flex items-center">
            <label
              className="block basis-[250px] text-sm font-semibold dark:text-gray-300"
              htmlFor={"service"}
            >
              Сервисное обслуживание:
            </label>
            <Select>
              <SelectTrigger className={"[&>span]:text-gray-500 rounded-3xl"} id={"service"}>
                <SelectValue placeholder="Выберите название услуги"/>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="service1">Сервис 1</SelectItem>
                <SelectItem value="service2">Сервис 2</SelectItem>
                <SelectItem value="service3">Сервис 3</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex">
            <label
              className="block basis-[250px] text-sm font-semibold dark:text-gray-300"
              htmlFor={"comment"}
            >
              Комментарий:
            </label>
            <Textarea className={"rounded-2xl"} id={"comment"} placeholder="Введите комментарий"/>
          </div>

          <div className={"flex gap-5"}>

            <div className="flex items-start gap-2">
              <Checkbox
                required id="agree" checked={isChecked}
                onCheckedChange={(checked) => setIsChecked(checked === true)}
              />
              <label htmlFor="agree" className="text-sm dark:text-gray-300">
                Нажимая на &#34;Отправить&#34; я даю{" "}
                <a href="#" className="text-blue-600 dark:text-blue-400 underline">
                  Согласие на обработку персональных данных
                </a>{" "}
                и{" "}
                <a href="#" className="text-blue-600 dark:text-blue-400 underline">
                  Политику в отношении обработки персональных данных
                </a>
              </label>
            </div>

            <Button type="submit" className="basis-[280px] p-5 rounded-3xl">
              Отправить
            </Button>
          </div>

        </form>
      </DialogContent>
    </Dialog>
  );
};
