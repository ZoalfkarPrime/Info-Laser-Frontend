import { cn } from "@/lib/utils";
import React from "react";
import { Container } from "@/components/shared/Container";
import { ClassName } from "@/types/types";
import { SocialListVkYoutube } from "@/components/shared/social/SocialListVkYoutube";
import SocialOnlineOfflineBanner from "@/types/content/global/social-online-offline-banner";
import { readContentAsJsonByFilter } from "@/services/content.service";
import { GLOBAL_CONTENT, SOCIAL_MEDIA_BANNER } from "@/lib/variables";

export const SocialBanner: React.FC<ClassName & { title?: string }> = async ({ className, title }) => {
  const meta = await readContentAsJsonByFilter({ referenceType: GLOBAL_CONTENT, section: SOCIAL_MEDIA_BANNER });
  const socialBannerJson = meta.find(content => content.title === (title ?? 'about'));
  const content = socialBannerJson ? SocialOnlineOfflineBanner.fromContentJson(socialBannerJson) : undefined;

  return (
    <div className={cn("", className)}>
      <Container>
        <div
          className={cn(
            "grid grid-cols-12 bg-no-repeat bg-cover rounded-4xl overflow-hidden py-20 px-10",
            !content?.image && "bg-[url('/img/banners/bg/social-banner.jpg')]",
            "max-md:rounded-[20px]"
          )}
          style={content?.image ? { backgroundImage: `url(${content.image})` } : {}}
        >
          <div className="col-start-1 col-end-7">
            <div className={"text-white"}>
              <p className="text-3xl font-semibold mb-3">{content?.upperText}</p>
              <p className="text-sm mb-5">
                {content?.lowerText}
              </p>
              <SocialListVkYoutube vk={content?.vk} youtube={content?.youtube} />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
