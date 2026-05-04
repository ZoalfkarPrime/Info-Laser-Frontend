import { ClassName } from "@/types/types";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

import {
  SOCIAL_TG_LINK,
  SOCIAL_VK_LINK,
  SOCIAL_WHATSAPP_LINK,
  SOCIAL_YOUTUBE_LINK
} from "@/lib/variables";

export const SocialList: React.FC<ClassName & { socialMedia?: { youtube?: string, telegram?: string, whatsapp?: string, vk?: string } }> = ({
  className,
  socialMedia = {
    youtube: SOCIAL_YOUTUBE_LINK,
    telegram: SOCIAL_TG_LINK,
    whatsapp: SOCIAL_WHATSAPP_LINK,
    vk: SOCIAL_VK_LINK
  }
}) => {
  return (
    <ul className={cn(
      "flex gap-3",
      className
    )}>
      {
        socialMedia?.youtube && (
          <li>
            <Link
              target={"_blank"}
              className={"hover:[&>img]:scale-[1.1] focus:[&>img]:scale-[1.1]"}
              href={socialMedia?.youtube}
            >
              <Image
                className={"transition-transform duration-300"}
                alt={"icon"}
                src={"/img/icons/social/icon-youtube.svg"}
                height={28} width={28}
              />
            </Link>
          </li>
        )
      }
      {
        socialMedia?.telegram && (
          <li>
            <Link
              target={"_blank"}
              className={"hover:[&>img]:scale-[1.1] focus:[&>img]:scale-[1.1]"}
              href={socialMedia?.telegram}
            >
              <Image
                className={"transition-transform duration-300"}
                alt={"icon"}
                src={"/img/icons/social/icon-tg.svg"}
                height={28} width={28}
              />
            </Link>
          </li>
        )}

      {
        socialMedia?.whatsapp && (
          <li>
            <Link
              target={"_blank"}
              className={"hover:[&>img]:scale-[1.1] focus:[&>img]:scale-[1.1]"}
              href={socialMedia?.whatsapp}
            >
              <Image
                className={"transition-transform duration-300"}
                alt={"icon"}
                src={"/img/icons/social/icon-whatsapp.svg"}
                height={28} width={28}
              />
            </Link>
          </li>
        )}
      {
        socialMedia?.vk && (
          <li>
            <Link
              target={"_blank"}
              className={"hover:[&>img]:scale-[1.1] focus:[&>img]:scale-[1.1]"}
              href={socialMedia?.vk}
            >
              <Image
                className={"transition-transform duration-300"}
                alt={"icon"}
                src={"/img/icons/social/icon-vk.svg"}
                height={28} width={28}
              />
            </Link>
          </li>
        )}
    </ul>
  );
};
