import {cn} from "@/lib/utils";
import React from "react";
import {Container} from "@/components/shared/Container";
import {ClassName} from "@/types/types";
import {SocialListVkYoutube} from "@/components/shared/social/SocialListVkYoutube";

export const SocialBanner: React.FC<ClassName> = ({className}) => {

  return (
    <div className={cn("", className)}>
      <Container>
        <div
          className={cn(
            "grid grid-cols-12 bg-[url('/img/banners/bg/social-banner.jpg')] bg-no-repeat bg-cover rounded-4xl overflow-hidden py-20 px-10",
            "max-md:rounded-[20px]"
          )}>
          <div className="col-start-1 col-end-7">
            <div className={"text-white"}>
              <p className="text-3xl font-semibold mb-3">Больше информации в соцсетях</p>
              <p className="text-sm mb-5">
                Продаем, настраиваем и обслуживаем лазерные станки, граверы и резаки с 2009 года.
              </p>
              <SocialListVkYoutube/>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
