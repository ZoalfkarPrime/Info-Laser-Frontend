import {cn} from '@/lib/utils';
import React from 'react';
import Link from "next/link";
import Image from "next/image";
import {ClassName} from "@/types/types";

export const Logo: React.FC<ClassName> = ({className}) => {

  return (
    <Link className={cn('', className)} href={'/'}>
      <Image src='/logo.svg' width={150} height={23} alt={'logo'} priority={true}/>
    </Link>
  );
};
