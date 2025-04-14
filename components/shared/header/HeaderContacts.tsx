import React from "react";
import Link from "next/link";
import {Phone} from "lucide-react";
import {CallbackBtn} from "@/components/shared/btns/CallbackBtn";

export const HeaderContacts = () => {

  return (
    <>
      <div className="flex items-center flex-col gap-y-1 ml-5">

        <Link
          href="tel:88002222741"
          className="flex items-center gap-x-2 hover:text-[var(--violet)] transition-colors"
        >
          <Phone size={18}/>
          8 (800) 222-27-41
        </Link>

        <CallbackBtn
          className={"bg-inherit text-[var(--violet)] h-auto p-0 hover:bg-inherit  hover:text-[var(--red)] focus:text-[var(--red)]"}
          title={'Обратный звонок'}
        />

      </div>
    </>
  );
};
