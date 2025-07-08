import {Checkbox} from "@/components/ui/Checkbox";
import Link from "next/link";
import {PERSONAL_AGREEMENT} from "@/lib/variables";
import React, {useState} from "react";

export const PersonalAgreement = () => {
  const [isChecked, setIsChecked] = useState(false);
  
  return (
    <div className={"flex gap-5"}>
      <div className="flex items-start gap-2">
        <Checkbox
          required id="agree" checked={isChecked}
          onCheckedChange={(checked) => setIsChecked(checked === true)}
        />
        <label htmlFor="agree" className="text-sm dark:text-gray-300 max-md:text-xs">
          Нажимая на &#34;Оформить предзаказ&#34; я даю{" "}
          <Link
            href={PERSONAL_AGREEMENT}
            className="text-[var(--violet)] underline hover:text-[var(--red)] transition-colors"
          >
            Согласие на обработку персональных данных
          </Link>{" "}
          и{" "}
          <Link
            href={PERSONAL_AGREEMENT}
            className="text-[var(--violet)] underline hover:text-[var(--red)] transition-colors"
          >
            Политику в отношении обработки персональных данных
          </Link>
        </label>
      </div>
    </div>
  );
};
