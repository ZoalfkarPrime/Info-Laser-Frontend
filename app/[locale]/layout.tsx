import "../globals.css";
import {manrope} from "../fonts";
import React, {ReactNode} from "react";
import {CartProvider} from "@/context/CartContext";
import {cn} from "@/lib/utils";
import {Toaster} from "react-hot-toast";
import {Header} from "@/components/shared/header/Header";
import {Footer} from "@/components/shared/footer/Footer";
import {BreadcrumbWrapper} from "@/components/shared/BreadcrumbWrapper";
import {getProducts} from "@/api/api";
import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export async function generateMetadata() {
  return {
    title: "InfoLaser",
    description: "Тут заполняется СЕО",
  };
}

export default async function LocaleLayout({children, params}: Props) {
  const {locale} = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const productsData = await getProducts();

  return (
    <html lang={locale}>
    <head>
      <link rel="icon" href="/favicon.ico"/>
      <title>InfoLaser</title>
      <meta name="robots" content="noindex, nofollow"/>
    </head>
    <body className={cn("min-h-screen", manrope.className)}>
    <Toaster position="top-right"/>
    <CartProvider>
      <NextIntlClientProvider>
        <Header products={productsData.products}/>
        <main>
          <BreadcrumbWrapper/>
          {children}
        </main>
        <Footer/>
      </NextIntlClientProvider>
    </CartProvider>
    </body>
    </html>
  );
}
