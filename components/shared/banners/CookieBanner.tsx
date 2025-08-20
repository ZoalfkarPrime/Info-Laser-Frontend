'use client';

import React, {useEffect, useState} from 'react';
import {cn} from '@/lib/utils';
import Link from "next/link";
import {PERSONAL_AGREEMENT} from "@/lib/variables";
import {Button} from "@/components/ui/Button";
import Image from "next/image";

export const CookieBanner: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className={cn(
        "fixed bottom-10 left-10 bg-[var(--gray)] shadow-xl inset-shadow-xs rounded-3xl p-6 z-50",
        "flex items-center justify-between gap-4",
        "max-xl:left-5 max-xl:right-5 max-xl:bottom-5",
        "max-md:flex-col max-md:gap-3"
      )}
    >

      <div className="flex gap-x-5 text-sm tracking-wider max-w-[700px] max-md:text-xs">
        <Image
          src="/img/icons/cookie-icon.svg"
          alt="cookie"
          width={40}
          height={40}
          className="shrink-0 max-md:place-self-start"
        />
        <p>
          Мы используем файлы cookie для улучшения работы сайта, персонализации контента и анализа посещаемости в
          соответствии с 158-ФС &#34;О персональных данных&#34;. Продолжая использовать сайт, вы соглашаетесь с нашей
          <Link
            className={"inline-flex text-[var(--violet)] hover:text-[var(--red)] focus:text-[var(--red)] underline transition-colors duration-300 ml-1"}
            href={PERSONAL_AGREEMENT}
          >
            Политикой конфиденциальности
          </Link>
        </p>
      </div>

      <div className={cn("flex gap-3 shrink-0")}>
        <Button
          variant={"violetOutline"}
          onClick={handleAccept}
        >
          Принять всё
        </Button>
        <Button
          variant={"violet"}
          onClick={handleDecline}
        >
          Отклонить
        </Button>
      </div>
    </div>
  );
};
