import {ClassName} from "@/types/types";
import React from "react";
import {cn} from "@/lib/utils";
import {VkIcon} from "@/components/shared/icons/social/VkIcon";
import {YoutubeIcon} from "@/components/shared/icons/social/YoutubeIcon";
import {UniqButtonLink} from "@/components/ui/UniqButtonLink";
import {SOCIAL_VK_LINK, SOCIAL_YOUTUBE_LINK} from "@/lib/variables";

export const SocialListVkYoutube: React.FC<ClassName> = ({className}) => {
  return (
    <ul className={cn(
      "flex gap-5",
      "max-[370px]:gap-1",
      className
    )}>
      <li>
        <UniqButtonLink
          href={SOCIAL_VK_LINK}
          variant={"white"}
          className={"gap-x-2 py-2"}
        >
          <VkIcon className={"fill-[var(--violet)]"}/>
          Группа вконтакте
        </UniqButtonLink>
      </li>
      <li>
        <UniqButtonLink
          href={`https://www.youtube.com/${SOCIAL_YOUTUBE_LINK}`}
          variant={"white"}
          className={"gap-x-2 py-2"}
        >
          <YoutubeIcon className={"fill-[var(--violet)]"}/>
          Наш канал
        </UniqButtonLink>
      </li>
    </ul>
  );
};
