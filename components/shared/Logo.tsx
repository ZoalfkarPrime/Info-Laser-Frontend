import {cn} from "@/lib/utils";
import React from "react";
import Link from "next/link";
import Image from "next/image";

type LogoProps = {
  className?: string;
  name: string;
};

export const Logo: React.FC<LogoProps> = ({className, name}) => {
  return (
    <Link className={cn("block", className)} href="/">
      <Image src={`/img/icons/${name}.svg`} width={150} height={23} alt="logo" priority/>
    </Link>
  );
};
