import { Container } from "@/components/shared/Container";
import { SocialBannerMini } from "@/components/shared/banners/SocialBannerMini";
import { OfflineOrOnlineMini } from "@/components/shared/banners/OfflineOrOnlineMini";
import React from "react";
import { cn } from "@/lib/utils";
import { ClassName } from "@/types/types";

interface ISocialAndOnlineMiniProps {
  leftBannerTitle?: string;
  rightBannerTitle?: string;
  className: ClassName
}

export const SocialAndOnlineMini: React.FC<ISocialAndOnlineMiniProps> = ({ className, leftBannerTitle, rightBannerTitle }) => {
  return (
    <div className={cn("", className)}>
      <Container>
        <div className={"grid grid-cols-12 gap-5"}>
          <SocialBannerMini className={cn(
            "col-start-1 col-end-7",
            "max-xl:col-span-full"
          )}
            title={leftBannerTitle}
          />
          <OfflineOrOnlineMini className={cn(
            "col-start-7 col-end-13",
            "max-xl:col-span-full"
          )}
            title={rightBannerTitle}
          />
        </div>
      </Container>
    </div>
  );
};
