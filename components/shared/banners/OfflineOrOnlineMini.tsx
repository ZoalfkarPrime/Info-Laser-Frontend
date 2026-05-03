import { DemoBtn } from "@/components/shared/btns/DemoBtn";
import { cn } from "@/lib/utils";
import React from "react";
import { ClassName } from "@/types/types";
import { SocialList } from "@/components/shared/social/SocialList";
import SocialOnlineOfflineBanner from "@/types/content/global/social-online-offline-banner";
import { readContentAsJsonByFilter } from "@/services/content.service";
import { DELIVERY_PAGE_CONTENT, GLOBAL_CONTENT, SOCIAL_MEDIA_BANNER } from "@/lib/variables";

export const OfflineOrOnlineMini: React.FC<ClassName & { title?: string }> = async ({ className, title }) => {

  const meta = await readContentAsJsonByFilter({ referenceType: GLOBAL_CONTENT, section: SOCIAL_MEDIA_BANNER });
  const onlineOfflineBannerJson = meta.find(content => content.title === (title ?? DELIVERY_PAGE_CONTENT.socialBannerRight));
  const content = onlineOfflineBannerJson ? SocialOnlineOfflineBanner.fromContentJson(onlineOfflineBannerJson) : undefined;

  return (
    <div className={cn("", className)}>
      <div
        className={cn(
          "grid grid-cols-12 bg-no-repeat bg-cover rounded-4xl overflow-hidden min-h-[336px]",
          "md:px-10",
          !content?.image && "bg-[url('/img/banners/bg/online-or-offline-mini.jpg')] max-md:bg-[url('/img/banners/bg/online-or-offline-mini-mobile.jpg')]",
          "max-md:pt-6 max-md:px-5"
        )}
        style={content?.image ? { backgroundImage: `url(${content.image})` } : {}}
      >
        <div className={cn(
          "col-start-7 col-end-13 self-center",
          "max-md:col-span-full max-md:text-center max-md:justify-self-center max-md:self-start"
        )}>
          <div>
            <p className="text-xl font-semibold mb-2">{content?.upperText || "Online или Offline?"}</p>
            <p className={cn(
              "text-sm mb-5",
              "max-md:mb-2"
            )}>
              {content?.lowerText || "Продемонстрируем работу оборудования любым удобным способом: в более 50 городах России или по видеосвязи."}
            </p>
            <DemoBtn className={"mb-3"} title={content?.btnText || "Записаться на демонстрацию"} link={content?.btnLink} />
            <SocialList className={"max-md:justify-center"} socialMedia={{ youtube: content?.youtube, telegram: content?.telegram, whatsapp: content?.whatsapp, vk: content?.vk }} />
          </div>
        </div>
      </div>
    </div>
  );
}
