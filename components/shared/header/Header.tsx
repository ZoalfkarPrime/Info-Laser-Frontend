import React from "react";
import {Container} from "@/components/shared/Container";
import {HeaderContacts} from "@/components/shared/header/Header-contacts";
import {HeaderSearch} from "@/components/shared/header/Header-search";
import {Logo} from "@/components/shared/Logo";
import {HeaderNav} from "@/components/shared/header/Header-nav";
import {HeaderCity} from "@/components/shared/header/Header-city";


export const Header: React.FC = () => {

  return (
    <header className="relative bg-white shadow shadow-gray-200/80 py-2 z-50">
      <Container className="flex items-center justify-between">

        <Logo/>

        <HeaderCity/>

        <HeaderNav/>

        <HeaderSearch/>

        <HeaderContacts/>

      </Container>
    </header>
  );
};
