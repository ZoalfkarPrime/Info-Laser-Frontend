import Link from "next/link";
import {cn} from "@/lib/utils";
import React from "react";
import {ClassName} from "@/types/types";

interface Props extends ClassName {
  onClick?: () => void;
}

export const HeaderContactsItem: React.FC<Props> = ({className, onClick}) => {
  return (
    <li className={cn("", className)}>
      <Link
        className={cn("", className)}
        href={"/contacts"}
        onClick={onClick}
      >
        Контакты
      </Link>
    </li>
  );
};
