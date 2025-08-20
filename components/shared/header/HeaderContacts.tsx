import React from "react";
import Link from "next/link";
import {Phone} from "lucide-react";
import {CallbackBtn} from "@/components/shared/btns/CallbackBtn";
import {cn} from "@/lib/utils";
import {ClassName} from "@/types/types";
import {PHONE} from "@/lib/variables";

export const HeaderContacts: React.FC<ClassName> = ({className}) => {

  return (
    <>
      <div className={cn(
        "flex items-center flex-col gap-y-1 md:ml-5",
        "",
        className
      )}>

        <Link
          href={`tel:${PHONE}`}
          className={cn(
            "flex items-center gap-x-2 hover:text-[var(--violet)] font-semibold transition-colors",
            "max-md:text-sm"
          )}
        >
          <Phone size={18}/>
          {PHONE}
        </Link>

        <CallbackBtn
          className={"bg-inherit border-0 h-auto p-0  hover:text-[var(--red)] focus:text-[var(--red)] hover:bg-inherit focus:bg-inherit hover:shadow-none focus:shadow-none hover:border-none focus:border-none"}
          title={'Обратный звонок'}
        />

      </div>
    </>
  );
};
