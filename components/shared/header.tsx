import React from 'react';
import {cn} from "@/lib/utils";
import {Container} from "@/components/shared/container";
import Image from "next/image";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {ArrowRight, ShoppingCart, User} from "lucide-react";
import {Categories} from "@/components/shared/categories";

interface Props {
  className?: string,
}

export const Header: React.FC<Props> = ({className}) => {
  return (
    <header className={cn('shadow-xs border-b border-gray-300', className)}>
      <Container className="flex items-center justify-between py-2">

        {/*  Лого + Поиск*/}
        <Link href={'/'}>
          <Image src='/logo.svg' width={170} height={23} alt={'logo'}/>
        </Link>

        <Categories/>

        {/*  Авторизация + Корзина*/}
        <div className="flex items-center gap-3">
          <Button variant={'outline'} className="flex items-center gap-1 text-[16px]">
            <User size={18}/>
            Профиль
          </Button>

          <Button className="group relative">
            <b>0 ₽</b>
            <span className="h-full w-[1px] bg-white/30 mx-1"></span>
            <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
              <ShoppingCart size={16} className="relative" strokeWidth={2}/>
              <b>3</b>
            </div>
            <ArrowRight
              size={16}
              className="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
            />
          </Button>
        </div>

      </Container>
    </header>
  );
};
