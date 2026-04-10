import { ClassName } from "@/types/types";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn, normalizeHtml } from "@/lib/utils";
import SocialMedia from "@/types/content/home/social-media";

export const SocialList: React.FC<ClassName & { socialMedia: SocialMedia }> = ({ className, socialMedia }) => {
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
              href={normalizeHtml(socialMedia?.youtube)}
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
              href={normalizeHtml(socialMedia?.telegram)}
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
              href={normalizeHtml(socialMedia?.whatsapp)}
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
              href={normalizeHtml(socialMedia?.vk)}
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
