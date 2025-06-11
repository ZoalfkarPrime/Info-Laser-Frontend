import React from "react";
import {Container} from "@/components/shared/Container";
import {HeaderContacts} from "@/components/shared/header/HeaderContacts";
import {HeaderSearchBtn} from "@/components/shared/header/HeaderSearchBtn";
import {Logo} from "@/components/shared/Logo";
import {HeaderNav} from "@/components/shared/header/HeaderNav";
import {HeaderCity} from "@/components/shared/header/HeaderCity";
import {HeaderCartBtn} from "@/components/shared/header/HeaderCartBtn";
import {Product} from "@/types/types";

type HeaderProps = {
  products: Product[];
};

export const Header = ({products}: HeaderProps) => {

  return (
    <header className="relative bg-white shadow shadow-gray-200/80 py-5 z-50">
      <Container>
        <div className="flex items-center justify-between">
          <Logo name={"logo"} className="mr-7 shrink-0 max-md:mr-2 max-md:max-w-[115px]"/>

          <HeaderCity className={"max-md:hidden"}/>

          <HeaderNav/>

          <HeaderSearchBtn products={products}/>

          <HeaderCartBtn/>

          <HeaderContacts className={"max-xl:mr-13 max-md:hidden"}/>
        </div>
      </Container>
    </header>
  );
};
