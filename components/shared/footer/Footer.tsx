import React from "react";
import {ClassName} from "@/types/types";
import {cn} from "@/lib/utils";
import {Container} from "@/components/shared/Container";
import {Clock, Mail, Phone} from "lucide-react";
import Link from "next/link";
import {Logo} from "@/components/shared/Logo";
import {CallbackBtn} from "@/components/shared/btns/CallbackBtn";
import {SocialList} from "@/components/shared/social/SocialList";

export const Footer: React.FC<ClassName> = ({className}) => {

  return (
    <footer className={cn('bg-[var(--violet-footer-background)] py-10 mt-10', className)}>
      <Container>
        <div className={cn(
          'grid grid-cols-5 gap-5 text-sm',
          'max-lg:grid-cols-3',
          'max-md:grid-cols-2'
        )}>

          <div className={cn(
            "text-white",
            "max-md:col-span-full"
          )}>
            <Logo name={"logo-white"} className="mb-2"/>
            <p className="text-[var(--gray-text)]">Лазерные и фрезерные станки</p>
            <p className="mt-4">Наши соцсети:</p>
            <SocialList className={"mt-2"}/>
            <p className="mt-4 text-[var(--gray-text)]">
              Товары, представленные на сайте, не являются публичной офертой
            </p>
          </div>

          <div>
            <h3
              className="font-semibold uppercase border-b border-gray-300 pb-1 mb-2 text-[var(--gray-text)]">Компания</h3>
            <ul className="space-y-1 text-white">
              <li>
                <Link
                  className="hover:text-[var(--red)] focus:text-[var(--red)] transition-colors duration-300"
                  href="/adjustment"
                >
                  О компании
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-[var(--red)] focus:text-[var(--red)] transition-colors duration-300"
                  href="/articles"
                >
                  База знаний
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-[var(--red)] focus:text-[var(--red)] transition-colors duration-300"
                  href="/delivery"
                >
                  Оплата и доставка
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-[var(--red)] focus:text-[var(--red)] transition-colors duration-300"
                  href="/contacts"
                >
                  Контакты
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold uppercase border-b border-gray-300 pb-1 mb-2 text-[var(--gray-text)]">Лазерные
              станки</h3>
            <ul className="space-y-1 text-white">
              <li>
                <Link
                  className="hover:text-[var(--red)] focus:text-[var(--red)] transition-colors duration-300" href="#"
                >
                  Лазерные станки CO2
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-[var(--red)] focus:text-[var(--red)] transition-colors duration-300" href="#"
                >
                  Лазерные маркеры
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-[var(--red)] focus:text-[var(--red)] transition-colors duration-300" href="#"
                >
                  Лазерные труборезы
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-[var(--red)] focus:text-[var(--red)] transition-colors duration-300" href="#"
                >
                  Лазерные станки по металлу
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-[var(--red)] focus:text-[var(--red)] transition-colors duration-300" href="#"
                >
                  Лазерные сварочные аппараты
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-[var(--red)] focus:text-[var(--red)] transition-colors duration-300" href="#"
                >
                  Лазерные очистки
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3
              className="font-semibold uppercase border-b border-gray-300 pb-1 mb-2 text-[var(--gray-text)]">Комплектующие</h3>
            <ul className="space-y-1 text-white">
              <li>
                <Link
                  className="hover:text-[var(--red)] focus:text-[var(--red)] transition-colors duration-300" href="#"
                >
                  Лазерных станков
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-[var(--red)] focus:text-[var(--red)] transition-colors duration-300" href="#"
                >
                  Лазерных маркеров
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-[var(--red)] focus:text-[var(--red)] transition-colors duration-300" href="#"
                >
                  Станков по металлу
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-[var(--red)] focus:text-[var(--red)] transition-colors duration-300" href="#"
                >
                  Фрезерных станков
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-[var(--red)] focus:text-[var(--red)] transition-colors duration-300"
                  href="#"
                >
                  Плоттеров
                </Link>
              </li>
            </ul>
          </div>

          <dl className="text-white">

            <div className="flex gap-x-2 mb-4">
              <Mail className={"text-[var(--gray-text)]"} size={16}/>
              <div>
                <dt className="uppercase text-[var(--gray-text)]">Почта</dt>
                <dd>
                  <Link
                    className="font-semibold hover:text-[var(--red)] focus:text-[var(--red)] transition-colors duration-300"
                    href="mailto:info@infolaser.ru"
                  >
                    info@infolaser.ru
                  </Link>
                </dd>
              </div>
            </div>

            <div className="flex gap-x-2 mb-4">
              <Phone className={"text-[var(--gray-text)]"} size={16}/>
              <div>
                <dt className="uppercase text-[var(--gray-text)]">Телефон</dt>
                <dd>
                  <Link
                    className="font-semibold hover:text-[var(--red)] focus:text-[var(--red)] transition-colors duration-300"
                    href="tel:88002222741"
                  >
                    8 (800) 222-27-41
                  </Link>
                </dd>
              </div>
            </div>

            <CallbackBtn
              className="text-white rounded-3xl border border-gray-600 mb-4 bg-[#ABB4D71A]"
              title={"Обратный звонок"}
            />

            <div className="flex gap-x-2">
              <Clock className={"text-[var(--gray-text)]"} size={16}/>
              <div>
                <dt className="uppercase text-[var(--gray-text)]">Время работы</dt>
                <dd><span className="uppercase">пн-пт: 9.00-19.00</span></dd>
              </div>
            </div>

          </dl>
        </div>

        <div className={cn(
          "flex items-center justify-between text-white border-t border-gray-300 text-sm mt-4 pt-4",
          "max-md:flex-col max-md:items-start max-md:gap-3"
        )}>
          <span className={"text-[var(--gray-text)]"}>© 2009–{new Date().getFullYear()}, «Инфо-Сервис».</span>
          {/* TODO : Добавить нужные ссылки */}
          <Link
            className={"hover:text-[var(--red)] focus:text-[var(--red)] transition-colors duration-300"}
            href="#"
          >
            Согласие на обработку персональных данных
          </Link>
          <Link
            className={"hover:text-[var(--red)] focus:text-[var(--red)] transition-colors duration-300"}
            href={"#"}
          >
            Политика в отношении обработки персональных данных
          </Link>
        </div>
      </Container>
    </footer>
  );
};