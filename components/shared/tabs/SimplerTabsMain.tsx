"use client";

import {useState} from "react";
import {Tabs, TabsList, TabsTrigger, TabsContent} from "@/components/ui/Tabs";
import {Container} from "@/components/shared/Container";
import {cn} from "@/lib/utils";

const tabsData = [
  {
    tabName: "Самостоятельный запуск",
    tabDescription: "В комплекте идет инструкция. Опытный лазерщик скорее всего сможет сделать настройку и запустить станок самостоятельно.",
    tabVideoName: "flycut-4.mp4",
  },
  {
    tabName: "Пусконаладка",
    tabDescription: "Процесс пусконаладки включает в себя...",
    tabVideoName: "ringcut-4.mp4",
  },
  {
    tabName: "Файлы",
    tabDescription: "В этом разделе вы найдете все необходимые файлы...",
    tabVideoName: "microjoint-4.mp4",
  },
  {
    tabName: "Настройки",
    tabDescription: "Настройки позволяют вам управлять...",
    tabVideoName: "nesting-4.mp4",
  },
];

export const SimplerTabsMain = () => {
  const [selectedTab, setSelectedTab] = useState(tabsData[0].tabName);

  const currentTab = tabsData.find((tab) => tab.tabName === selectedTab) ?? tabsData[0];

  return (
    <section className="py-7">
      <Container className={"sm:relative"}>

        <div className={cn("sm:hidden max-sm:block")}>
          <div className="relative top-0 bottom-0 flex flex-col z-10 py-5 text-black">
            <h2 className="text-5xl font-bold mb-4 max-sm:text-2xl">
            <span className="block text-lg font-normal max-sm:text-sm">
              Первые в мире инновации:
            </span>
              Проще, безопаснее и эффективнее
            </h2>

            <Tabs
              value={selectedTab}
              onValueChange={(value) => setSelectedTab(value)}
            >
              <TabsList
                asChild
                className="bg-[#ABB4D7]/10 rounded-3xl border border-gray-500 backdrop-blur-lg py-6 px-2"
              >
                <ul
                  className={cn(
                    "flex gap-2",
                    "whitespace-nowrap",
                    "max-sm:overflow-x-auto max-sm:overflow-y-hidden",
                    "max-sm:max-w-full max-sm:justify-start",
                    "max-sm:-mx-2 max-sm:px-2 max-sm:gap-1",
                    "max-sm:py-5"
                  )}
                >
                  {tabsData.map((tab) => (
                    <li key={tab.tabName}>
                      <TabsTrigger
                        value={tab.tabName}
                        className={cn(
                          "text-black px-4 py-2 rounded-3xl transition",
                          "data-[state=active]:bg-[var(--violet)]/80 data-[state=active]:text-white",
                          "hover:cursor-pointer",
                          "max-sm:text-xs max-sm:px-2"
                        )}
                      >
                        {tab.tabName}
                      </TabsTrigger>
                    </li>
                  ))}
                </ul>
              </TabsList>

              {tabsData.map((tab) => (
                <TabsContent
                  key={tab.tabName}
                  value={tab.tabName}
                >
                  <p className="mt-4 text-lg max-sm:text-sm">{tab.tabDescription}</p>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>

        <div className={cn(
          "relative rounded-3xl overflow-hidden",
          "max-md:rounded-[20px]",
          "sm:min-h-[600px]",
          "max-sm:min-h-[300px]"
        )}>
          <video
            key={currentTab.tabVideoName}
            autoPlay
            loop
            muted
            className={cn(
              "absolute inset-0 w-full h-full object-cover",
            )}
          >
            <source src={`/video/${currentTab.tabVideoName}`} type="video/mp4"/>
          </video>

          <div className="absolute inset-0 bg-black/40"></div>

          <div className={cn("max-sm:hidden")}>
            <div
              className="absolute top-0 bottom-0 place-content-center-safe flex flex-col z-10 p-8 text-white max-w-[564px]">
              <h2 className="text-5xl font-bold mb-4">
            <span className="block text-lg font-normal">
              Первые в мире инновации:
            </span>
                Проще, безопаснее и эффективнее
              </h2>

              <Tabs
                value={selectedTab}
                onValueChange={(value) => setSelectedTab(value)}
              >
                <TabsList
                  asChild
                  className="bg-[#ABB4D7]/10 rounded-3xl border border-gray-500 backdrop-blur-lg py-6 px-2"
                >
                  <ul>
                    {tabsData.map((tab) => (
                      <li key={tab.tabName}>
                        <TabsTrigger
                          value={tab.tabName}
                          className={cn(
                            "text-white px-4 py-2 rounded-3xl transition",
                            "data-[state=active]:bg-[var(--violet)]/80 data-[state=active]:text-white",
                            "hover:cursor-pointer"
                          )}
                        >
                          {tab.tabName}
                        </TabsTrigger>
                      </li>
                    ))}
                  </ul>
                </TabsList>

                {tabsData.map((tab) => (
                  <TabsContent
                    key={tab.tabName}
                    value={tab.tabName}
                  >
                    <p className="mt-4 text-lg">{tab.tabDescription}</p>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
};
