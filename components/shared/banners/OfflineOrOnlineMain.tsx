import { DemoBtn } from "@/components/shared/btns/DemoBtn";
import { cn } from "@/lib/utils";
import React from "react";
import { Container } from "@/components/shared/Container";
import { ClassName } from "@/types/types";
import { SocialList } from "@/components/shared/social/SocialList";
import SocialOnlineOfflineBanner from "@/types/content/global/social-online-offline-banner";
import { readContentAsJsonByFilter } from "@/services/content.service";
import { GLOBAL_CONTENT, HOME_PAGE_CONTENT, SOCIAL_MEDIA_BANNER } from "@/lib/variables";

export async function OfflineOrOnlineMain({ className, title = HOME_PAGE_CONTENT.bannerTitle }: ClassName & { title: string }) {
  const meta = await readContentAsJsonByFilter({ referenceType: GLOBAL_CONTENT, section: SOCIAL_MEDIA_BANNER, title });

  const socialOnlineOfflineBannerJson = meta.find(content => content.title === title);
  const content = socialOnlineOfflineBannerJson ? SocialOnlineOfflineBanner.fromContentJson(socialOnlineOfflineBannerJson) : undefined;

  return (
    <div className={cn("py-7", className)}>
      <Container>
        <div
          className={cn(
            "flex items-center justify-center bg-no-repeat bg-cover rounded-4xl overflow-hidden py-13 px-5",
            "max-xl:bg-center",
            "max-md:py-8",
            !content?.image && "bg-[url('/img/banners/bg/online-or-offline.jpg')] max-md:bg-[url('/img/banners/bg/online-or-offline-mini-mobile.jpg')]"
          )}
          style={content?.image ? { backgroundImage: `url(${content.image})` } : {}}>
          <div className="text-center max-w-[600px]">
            <p className={cn(
              "text-3xl md:text-4xl font-bold mb-4",
              "max-md:text-2xl max-md:mb-3"
            )}>
              {content?.upperText || ""}
            </p>
            <p className={cn(
              "text-lg leading-6 mb-6",
              "max-md:text-xs max-md:leading-4 max-md:mb-3"
            )}>
              {content?.lowerText || ""}
            </p>
            <SocialList socialMedia={{ youtube: content?.youtube, telegram: content?.telegram, whatsapp: content?.whatsapp, vk: content?.vk }} className={"justify-center mb-6 max-md:mb-3"} />
            <DemoBtn
              className={"place-self-center"}
              title={content?.btnText || ""}
              link={content?.btnLink}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
