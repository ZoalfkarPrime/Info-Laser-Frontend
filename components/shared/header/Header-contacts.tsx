import Link from "next/link";
import {Mail, Phone} from "lucide-react";

export const HeaderContacts = () => {
  return (
    <dl className="flex items-center gap-x-5">
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

      <div>
        <dt className="hidden">Mail</dt>
        <dd>
          <Link
            href="mailto:info@lasercut.ru"
            className="flex items-center gap-x-2 hover:text-[#b82c2c] transition-colors"
          >
            <Mail size={18}/>
            info@infolaser.ru
          </Link>
        </dd>
      </div>
    </dl>
  );
};
