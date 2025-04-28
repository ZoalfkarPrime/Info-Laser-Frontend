import {cn} from "@/lib/utils";
import React from "react";
import Link from "next/link";
import {Container} from "@/components/shared/Container";
import {ClassName} from "@/types/types";
import {Button} from "@/components/ui/Button";
import {VkIcon} from "@/components/shared/icons/VkIcon";
import {YoutubeIcon} from "@/components/shared/icons/YoutubeIcon";

export const SocialBanner: React.FC<ClassName> = ({className}) => {

  const CHANNEL_ID = "@InfoLaser"

  return (
    <div className={cn("", className)}>
      <Container>
        <div
          className="grid grid-cols-12 bg-[url('/img/banners/bg/social-banner.jpg')] bg-no-repeat bg-cover rounded-4xl overflow-hidden py-20 px-10"
        >
          <div className="col-start-1 col-end-7">
            <div className={"text-white"}>
              <p className="text-3xl font-semibold mb-3">Больше информации в соцсетях</p>
              <p className="text-sm mb-5">
                Продаем, настраиваем и обслуживаем лазерные станки, граверы и резаки с 2009 года.
              </p>
              <ul className={"flex gap-5"}>
                <li>
                  <Button
                    asChild
                    className={cn(
                      "inline-flex items-center gap-2 text-[var(--violet)] bg-white rounded-3xl transition-colors px-3 py-5",
                      "hover:text-white focus:text-white focus:bg-primary/90"
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
                      "hover:text-white focus:text-white focus:bg-primary/90"
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

            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
