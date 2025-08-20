import {ClassName} from "@/types/types";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import {cn} from "@/lib/utils";
import {SOCIAL_TG_LINK, SOCIAL_VK_LINK, SOCIAL_WHATSAPP_LINK, SOCIAL_YOUTUBE_LINK} from "@/lib/variables";

export const SocialList: React.FC<ClassName> = ({className}) => {
  return (
    <ul className={cn(
      "flex gap-3",
      className
    )}>
      <li>
        <Link
          target={"_blank"}
          className={"hover:[&>img]:scale-[1.1] focus:[&>img]:scale-[1.1]"}
          href={`https://www.youtube.com/${SOCIAL_YOUTUBE_LINK}`}
        >
          <Image
            className={"transition-transform duration-300"}
            alt={"icon"}
            src={"/img/icons/social/icon-youtube.svg"}
            height={28} width={28}
          />
        </Link>
      </li>
      <li>
        <Link target={"_blank"} className={"hover:[&>img]:scale-[1.1] focus:[&>img]:scale-[1.1]"} href={SOCIAL_TG_LINK}>
          <Image
            className={"transition-transform duration-300"}
            alt={"icon"}
            src={"/img/icons/social/icon-tg.svg"}
            height={28} width={28}
          />
        </Link>
      </li>
      <li>
        <Link target={"_blank"} className={"hover:[&>img]:scale-[1.1] focus:[&>img]:scale-[1.1]"}
              href={SOCIAL_WHATSAPP_LINK}>
          <Image
            className={"transition-transform duration-300"}
            alt={"icon"}
            src={"/img/icons/social/icon-whatsapp.svg"}
            height={28} width={28}
          />
        </Link>
      </li>
      <li>
        <Link target={"_blank"} className={"hover:[&>img]:scale-[1.1] focus:[&>img]:scale-[1.1]"} href={SOCIAL_VK_LINK}>
          <Image
            className={"transition-transform duration-300"}
            alt={"icon"}
            src={"/img/icons/social/icon-vk.svg"}
            height={28} width={28}
          />
        </Link>
      </li>

    </ul>
  );
};
