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
import {NextIntlClientProvider, hasLocale} from "next-intl";
import {notFound} from "next/navigation";
import {routing} from "@/i18n/routing";
import {CookieBanner} from "@/components/shared/banners/CookieBanner";

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export async function generateMetadata(
  {
    params: paramsPromise,
  }: {
    params: Promise<{ locale: string; id?: string }>;
  }) {
  const params = await paramsPromise;
  const {id} = params;

  return {
    robots: "noindex, nofollow",
    icons: {
      icon: "/favicon.ico",
    },
    openGraph: {
      images: [
        {
          url: `https://example.com/images/page-${id ?? "default"}.jpg`,
          width: 800,
          height: 600,
        },
      ],
    },
    alternates: {
      canonical: `https://example.com/page-${id ?? "default"}`,
    },
  };
}

export default async function LocaleLayout({children, params: paramsPromise}: Props) {
  const {locale} = await paramsPromise;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const productsData = await getProducts();

  return (
    <html lang={locale}>
    <body className={cn("min-h-screen flex flex-col", manrope.className)}>
    <Toaster position="top-right"/>
    <CartProvider>
      <NextIntlClientProvider locale={locale}>
        <Header products={productsData.products}/>
        <main className={"flex-1"}>
          <BreadcrumbWrapper/>
          {children}
        </main>
        <Footer/>
        <CookieBanner/>
      </NextIntlClientProvider>
    </CartProvider>
    </body>
    </html>
  );
}

