import React from 'react';
import {cn} from "@/lib/utils";
import {Container} from "@/components/shared/Container";
import {ClassName} from "@/types/types";
import {HeaderContacts} from "@/components/shared/header/Header-contacts";
import {HeaderSearch} from "@/components/shared/header/Header-search";
import {Logo} from "@/components/shared/Logo";
import {HeaderNav} from "@/components/shared/header/Header-nav";

export const Header: React.FC<ClassName> = async ({className}) => {

  return (
    <header className={cn('', className)}>

      {/* Header-TOP */}
      <div className="bg-gray-300/20 py-2">
        <Container className="flex items-center justify-between">
          <span>Санкт Петербург</span>
          <HeaderContacts/>
        </Container>
      </div>

      {/* Header-BOT */}
      <div className="">
        <Container className="flex items-center justify-between ">

          <Logo className="mr-7"/>

          <HeaderNav/>

          <HeaderSearch/>

        </Container>
      </div>
    </header>
  );
};
