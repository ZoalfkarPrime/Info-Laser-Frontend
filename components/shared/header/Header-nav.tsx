import React from 'react';
import Link from "next/link";
import {getAllProducts} from "@/lib/api";

export const HeaderNav: React.FC = async () => {

  const products = await getAllProducts();

  return (
    <nav className="mr-auto bg-white">
      <ul className="flex items-center">
        <li className="relative">
          <button
            className="hover:cursor-pointer hover:text-[#6941f9] transition-colors duration-300 py-3 px-3"
            type='button'
          >
            Товары
          </button>

          <div className="absolute top-12 left-0 right-0 bg-red-400 z-20">
            tetetete
          </div>
        </li>
        <li>
          <Link
            className="block hover:cursor-pointer hover:text-[#6941f9] transition-colors duration-300 py-3 px-3"
            href={"/clients"}
          >
            Клиенты
          </Link>
        </li>
        <li>
          <Link
            className="block hover:cursor-pointer hover:text-[#6941f9] transition-colors duration-300 py-3 px-3"
            href={"/articles"}
          >
            Статьи
          </Link>
        </li>
        <li>
          <Link
            className="block hover:cursor-pointer hover:text-[#6941f9] transition-colors duration-300 py-3 px-3"
            href={"/delivery"}
          >
            Доставка и оплата
          </Link>
        </li>
        <li>
          <Link
            className="block hover:cursor-pointer hover:text-[#6941f9] transition-colors duration-300 py-3 px-3"
            href={"/about"}
          >
            О компании
          </Link>
        </li>
        <li>
          <Link
            className="block hover:cursor-pointer hover:text-[#6941f9] transition-colors duration-300 py-3 px-3"
            href={"/contacts"}
          >
            Контакты
          </Link>
        </li>
        <li>
          <Link
            className="block hover:cursor-pointer hover:text-[#6941f9] transition-colors duration-300 py-3 px-3"
            href={"/service"}
          >
            Сервис
          </Link>
        </li>
      </ul>
    </nav>
  );
};
