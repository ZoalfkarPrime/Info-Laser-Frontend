import React from "react";
import {Container} from "@/components/shared/Container";
import {HeaderContacts} from "@/components/shared/header/Header-contacts";
import {HeaderSearchBtn} from "@/components/shared/header/Header-search-btn";
import {Logo} from "@/components/shared/Logo";
import {HeaderNav} from "@/components/shared/header/Header-nav";
import {HeaderCity} from "@/components/shared/header/Header-city";
import {HeaderCartBtn} from "@/components/shared/header/Header-cart-btn";

export const Header: React.FC = () => {

  return (
    <header className="relative bg-white shadow shadow-gray-200/80 py-2 z-50">
      <Container className="flex items-center justify-between">

        <Logo name={"logo"} className="mr-7"/>

        <HeaderCity/>

        <HeaderNav/>

        <HeaderSearchBtn/>

        <HeaderCartBtn/>

        <HeaderContacts/>

      </Container>
    </header>
  );
};
