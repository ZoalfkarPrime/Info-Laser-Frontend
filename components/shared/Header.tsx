import React from 'react';
import {cn} from "@/lib/utils";
import {Container} from "@/components/shared/Container";
import Image from "next/image";
import Link from "next/link";
import {ClassName} from "@/types/types";
import {CategoriesMain} from "@/components/shared/categories/Categories-main";
import {getCategories} from "@/lib/api";
import {ContactsHeader} from "@/components/shared/Contacts-header";
import {SearchInput} from "@/components/shared/Search-input";

export const Header: React.FC<ClassName> = async ({className}) => {
  const categories = await getCategories();

  return (
    <header className={cn('shadow-xs border-b border-gray-300', className)}>

      {/* Header-TOP */}
      <div className="bg-gray-300/20 py-2">
        <Container className="flex items-center justify-between">
          <span>Санкт Петербург</span>
          <ContactsHeader/>
        </Container>
      </div>

      {/* Header-BOT */}
      <div className="py-2">
        <Container className="flex items-center justify-between ">

          <Link href={'/'}>
            <Image src='/logo.svg' width={150} height={23} alt={'logo'} priority={true}/>
          </Link>

          <CategoriesMain categories={categories}/>

          <SearchInput/>
          
        </Container>
      </div>

    </header>
  );
};
