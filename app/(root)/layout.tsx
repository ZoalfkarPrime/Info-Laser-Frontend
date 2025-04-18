import type {Metadata} from "next";
import {Header} from "@/components/shared/header/Header";
import React from "react";
import {Footer} from "@/components/shared/footer/Footer";
import {BreadcrumbWrapper} from "@/components/shared/BreadcrumbWrapper";
import {getProducts} from "@/api/api";

export const metadata: Metadata = {
  title: "InfoLaser",
  description: "Тут заполняется СЕО",
};

export default async function RootLayout(
  {
    children,
  }:
  Readonly<{
    children: React.ReactNode;
  }>) {

  const productsData = await getProducts();

  return (
    <>
      <Header products={productsData.products}/>
      <main>
        <BreadcrumbWrapper/>
        {children}
      </main>
      <Footer/>
    </>
  );
}
