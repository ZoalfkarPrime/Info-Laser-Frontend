import type {Metadata} from "next";
import {PT_Sans} from "next/font/google";
import "./globals.css";
import {Header} from "@/components/shared/header";


const ptSans = PT_Sans({
  variable: "--font-pt-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
});

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

    <body className={ptSans.variable}>

    <Header/>

    <main className="min-h-screen">
      {children}
    </main>
    </body>
    </html>
  );
}
