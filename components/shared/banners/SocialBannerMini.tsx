import {cn} from "@/lib/utils";
import React from "react";
import {ClassName} from "@/types/types";
import {SocialListVkYoutube} from "@/components/shared/social/SocialListVkYoutube";

export const SocialBannerMini: React.FC<ClassName> = ({className}) => {

  return (
    <div className={cn("", className)}>
      <div
        className={cn(
          "grid grid-cols-12 bg-[url('/img/banners/bg/social-banner-mini.jpg')] bg-no-repeat bg-cover rounded-4xl overflow-hidden min-h-[336px]",
          "md:px-10",
          "max-md:pt-6 max-md:px-5 max-md:bg-[url('/img/banners/bg/social-banner-mini-mobile.jpg')]"
        )}
      >
        <div className={cn(
          "col-start-1 col-end-7 self-center",
          "max-md:col-span-full max-md:text-center max-md:justify-self-center max-md:self-start"
        )}>
          <div className={"text-white"}>
            <p className="text-xl/6 font-semibold mb-2">Больше информации в соцсетях</p>
            <p className={cn(
              "text-sm mb-5",
              "max-md:text-xs"
            )}>
              Продаем, настраиваем и обслуживаем лазерные станки, граверы и резаки с 2009 года.
            </p>
            <SocialListVkYoutube className={"max-md:justify-center"}/>
          </div>
        </div>
      </div>
    </div>
  );
}
