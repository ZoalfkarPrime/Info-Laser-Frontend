import {Container} from "@/components/shared/Container";
import {SocialBannerMini} from "@/components/shared/banners/SocialBannerMini";
import {OfflineOrOnlineMini} from "@/components/shared/banners/OfflineOrOnlineMini";
import React from "react";
import {cn} from "@/lib/utils";
import {ClassName} from "@/types/types";

export const SocialAndOnlineMini: React.FC<ClassName> = ({className}) => {
  return (
    <div className={cn("", className)}>
      <Container>
        <div className={"grid grid-cols-12 gap-5"}>
          <SocialBannerMini className={cn(
            "col-start-1 col-end-7",
            "max-xl:col-span-full"
          )}/>
          <OfflineOrOnlineMini className={cn(
            "col-start-7 col-end-13",
            "max-xl:col-span-full"
          )}/>
        </div>
      </Container>
    </div>
  );
};
