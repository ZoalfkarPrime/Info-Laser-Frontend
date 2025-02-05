import type {Metadata} from "next";
import "./globals.css";
import {Header} from "@/components/shared/header/Header";
import {ptSans} from './fonts'

export const metadata: Metadata = {
  title: "InfoLaser",
  description: "Тут заполняется СЕО",
};

export default function RootLayout(
  {
    children,
  }:
  Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <html lang="en">

    <head>
      <link data-rh="true" rel="icon" href="/favicon.ico"/>
      <title>InfoLaser</title>
    </head>

    <body className={ptSans.className}>

    <Header/>

    <main className="min-h-screen">
      {children}
    </main>
    </body>
    </html>
  );
}
