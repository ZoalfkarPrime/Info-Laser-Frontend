import { cn } from "@/lib/utils";
import React from "react";
import { ClassName } from "@/types/types";
import { SocialListVkYoutube } from "@/components/shared/social/SocialListVkYoutube";
import SocialOnlineOfflineBanner from "@/types/content/global/social-online-offline-banner";
import { readContentAsJsonByFilter } from "@/services/content.service";
import { DELIVERY_PAGE_CONTENT, GLOBAL_CONTENT, SOCIAL_MEDIA_BANNER } from "@/lib/variables";

export const SocialBannerMini: React.FC<ClassName & { title?: string }> = async ({ className, title }) => {
  const meta = await readContentAsJsonByFilter({ referenceType: GLOBAL_CONTENT, section: SOCIAL_MEDIA_BANNER });
  const socialBannerJson = meta.find(content => content.title === (title ?? DELIVERY_PAGE_CONTENT.socialBannerLeft));
  const content = socialBannerJson ? SocialOnlineOfflineBanner.fromContentJson(socialBannerJson) : undefined;

  return (
    <div className={cn("", className)}>
      <div
        className={cn(
          "grid grid-cols-12 bg-no-repeat bg-cover rounded-4xl overflow-hidden min-h-[336px]",
          "md:px-10",
          !content?.image && "bg-[url('/img/banners/bg/social-banner-mini.jpg')] max-md:bg-[url('/img/banners/bg/social-banner-mini-mobile.jpg')]",
          "max-md:pt-6 max-md:px-5 max-md:rounded-[20px]"
        )}
        style={content?.image ? { backgroundImage: `url(${content.image})` } : {}}
      >
        <div className={cn(
          "col-start-1 col-end-8 self-center",
          "max-md:col-span-full max-md:text-center max-md:justify-self-center max-md:self-start"
        )}>
          <div className={"text-white"}>
            <p className="text-xl/6 font-semibold mb-2">{content?.upperText || "Больше информации в соцсетях"}</p>
            <p className={cn(
              "text-sm mb-5",
              "max-md:text-xs"
            )}>
              {content?.lowerText || "Продаем, настраиваем и обслуживаем лазерные станки, граверы и резаки с 2009 года."}
            </p>
            <SocialListVkYoutube className={"max-md:justify-center"} vk={content?.vk} youtube={content?.youtube} />
          </div>
        </div>
      </div>
    </div>
  );
}
