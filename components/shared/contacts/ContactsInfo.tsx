import React from "react";
import Link from "next/link";
import {Clock, Mail, MapPin, Phone} from "lucide-react";
import {Button} from "@/components/ui/Button";
import Map from "@/components/shared/yandex/Map";
import {useTranslations} from "next-intl";
import type {YMapLocationRequest} from "@yandex/ymaps3-types";
import {cn} from "@/lib/utils";

type TFunction = Awaited<ReturnType<typeof useTranslations>>;

interface ContactsInfoProps {
  t: TFunction;
}

export const ContactsInfo: React.FC<ContactsInfoProps> = ({t}) => {
  const rawLocation = t.raw('mapLocation') as [number, number];
  const rawPlaces = t.raw('mapPlaces') as {
    id: string;
    label: string;
    text: string;
    longitude: number;
    latitude: number;
  }[];

  const location: YMapLocationRequest = {
    center: rawLocation,
    zoom: 10,
  };

  return (
    <section className={"mb-10"}>
      <div className={"grid grid-cols-12 gap-5 bg-[var(--gray)] rounded-3xl p-3"}>
        <div className={cn(
          "col-start-1 col-end-7",
          "max-md:col-span-full"
        )}>
          <h2 className={cn(
            "text-4xl font-semibold mb-8 pl-5",
            "max-xl:text-3xl max-xl:mb-5",
            "max-md:text-2xl"
          )}>
            {t('cityName') || 'Санкт-Петербург'}
          </h2>
          <dl className={cn(
            "mb-10 pl-5",
            "max-xl:mb-3"
          )}>
            <div className={"mb-8 max-xl:mb-3"}>
              <dt className={cn(
                "text-xl font-semibold mb-2",
                "max-md:text-lg"
              )}>
                Телефон для регионов
              </dt>
              <dd className={"pl-2"}>
                <Link
                  href={`tel:${t('cityPhone') || '8 (800) 222-27-41'}`}
                  className={cn(
                    "inline-flex items-center gap-x-2 hover:text-[var(--violet)] font-semibold transition-colors",
                    "max-md:text-sm"
                  )}
                >
                  <Phone size={18}/>
                  {t('cityPhone') || '8 (800) 222-27-41'}
                </Link>
              </dd>
            </div>
            <div className={"mb-5"}>
              <dt className={cn(
                "text-xl font-semibold mb-2",
                "max-md:text-lg"
              )}>
                Адрес офиса продаж и склада
              </dt>
              <dd className={cn(
                "flex gap-x-2 pl-2",
                "max-md:text-sm"
              )}>
                <MapPin className={"shrink-0"} size={25}/>
                {t('address') || '193315, Санкт-Петербург, Дальневосточный пр-кт 100, стр.1, офис 6'}
              </dd>
            </div>
            <div className={"mb-3"}>
              <dt className={"hidden"}>График работы</dt>
              <dd className={cn(
                "flex items-center gap-2 pl-2",
                "max-md:text-sm"
              )}>
                <Clock className={"shrink-0"} size={20}/>
                Пн-Пт: 9:00-19:00
              </dd>
            </div>
            <div className={"mb-3"}>
              <dt className={"hidden"}>Телефон склада</dt>
              <dd className={"pl-2"}>
                <Link
                  href={`tel:${t('cityPhoneSecond') || '+7 (812) 336-42-29'}`}
                  className={cn(
                    "inline-flex items-center gap-x-2 hover:text-[var(--violet)] font-semibold transition-colors",
                    "max-md:text-sm"
                  )}
                >
                  <Phone className={"shrink-0"} size={18}/>
                  {t('cityPhoneSecond') || '+7 (812) 336-42-29'}
                </Link>
              </dd>
            </div>
            <div>
              <dt className={"hidden"}>Электронная почта</dt>
              <dd className={"pl-2"}>
                <Link
                  href="mailto:info@infolaser.ru"
                  className={cn(
                    "inline-flex items-center gap-x-2 hover:text-[var(--violet)] transition-colors",
                    "max-md:text-sm"
                  )}
                >
                  <Mail className={"size-5 shrink-0"}/>
                  info@infolaser.ru
                </Link>
              </dd>
            </div>
          </dl>
          <section className={cn(
            "flex justify-between gap-3 bg-white rounded-3xl p-5",
            "max-xl:flex-col",
            "max-md:p-3"
          )}>
            <div>
              <h3 className={cn(
                "text-xl font-semibold mb-5",
                "max-md:text-lg max-md:mb-2"
              )}>
                Реквизиты
              </h3>
              <p className={"max-md:text-sm"}>ООО &#34;Инфо-Сервис&#34;</p>
              <dl className={"max-md:text-sm"}>
                <div className={"flex gap-1"}>
                  <dt>ИНН:</dt>
                  <dd>7816345877</dd>
                </div>
                <div className={"flex gap-1"}>
                  <dt>КПП:</dt>
                  <dd>781101001</dd>
                </div>
                <div className={"flex gap-1"}>
                  <dt>ОГРН:</dt>
                  <dd>1167847470350</dd>
                </div>
                <div className={"flex gap-1"}>
                  <dt>ОКПО:</dt>
                  <dd>05880603</dd>
                </div>
              </dl>
            </div>

            <Button
              asChild
              variant={"outline"}
              className={cn(
                "mt-5 !border-[var(--violet)]/30 border-2 rounded-3xl place-self-end",
                "max-xl:place-self-start max-xl:mt-1",
              )}
            >
              <Link href={"#"}>Скачать/Посмотреть реквизиты</Link>
            </Button>
          </section>
        </div>

        <div className={cn(
          "col-start-7 col-end-13 bg-white rounded-3xl overflow-hidden",
          "max-md:col-span-full"
        )}>
          <div className={cn(
            "w-full h-[650px] rounded-3xl overflow-hidden",
            "max-md:h-[300px]",
          )}>
            <Map places={rawPlaces} location={location}/>
          </div>
        </div>
      </div>
    </section>
  );
};
