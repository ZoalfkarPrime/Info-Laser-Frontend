import {ClassName} from "@/types/types";
import React from "react";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/Button";
import {VkIcon} from "@/components/shared/icons/social/VkIcon";
import {YoutubeIcon} from "@/components/shared/icons/social/YoutubeIcon";

export const SocialListVkYoutube: React.FC<ClassName> = ({className}) => {

  const CHANNEL_ID = "@InfoLaser"

  return (
    <ul className={cn(
      "flex gap-5",
      "max-[370px]:gap-1",
      className
    )}>
      <li>
        <Button
          asChild
          className={cn(
            "inline-flex items-center gap-2 text-[var(--violet)] bg-white rounded-3xl transition-colors px-3 py-5",
            "hover:text-white focus:text-white focus:bg-primary/90",
            "max-md:text-xs",
            "max-[370px]:px-2"
          )}>
          <Link
            className={"hover:[&>svg]:fill-white focus:[&>svg]:fill-white"}
            href={`https://www.youtube.com/${CHANNEL_ID}`}
          >
            <VkIcon className={"fill-[var(--violet)]"}/>
            Группа вконтакте
          </Link>
        </Button>
      </li>
      <li>
        <Button
          asChild
          className={cn(
            "inline-flex items-center gap-2 text-[var(--violet)] bg-white rounded-3xl transition-colors px-3 py-5",
            "hover:text-white focus:text-white focus:bg-primary/90",
            "max-md:text-xs",
            "max-[370px]:px-2"
          )}>
          <Link
            className={"hover:[&>svg]:fill-white focus:[&>svg]:fill-white"}
            href={`https://www.youtube.com/${CHANNEL_ID}`}
          >
            <YoutubeIcon className={"fill-[var(--violet)]"}/>
            Наш канал
          </Link>
        </Button>
      </li>
    </ul>
  );
};
