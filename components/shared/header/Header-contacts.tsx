import React from "react";
import Link from "next/link";
import {Phone} from "lucide-react";
import {CallbackModal} from "@/components/shared/Callback-modal";

export const HeaderContacts = () => {


  return (
    <dl className="flex items-center flex-col gap-y-1 ml-5">
      <div>
        <dt className="hidden">Phone</dt>
        <dd>
          <Link
            href="tel:88002222741"
            className="flex items-center gap-x-2 hover:text-[#b82c2c] transition-colors"
          >
            <Phone size={18}/>
            8 (800) 222-27-41
          </Link>
        </dd>
      </div>

      <CallbackModal/>

    </dl>
  );
};
