import React from "react";
import {cn} from "@/lib/utils";
import {ClassName} from "@/types/types";
import {CircleCheck} from "lucide-react";
import {Container} from "@/components/shared/Container";
import {AdjustmentVideo} from "@/components/shared/adjustment/AdjustmentVideo";

interface AdjustmentStagesProps extends ClassName {
  data: {
    id: number;
    text: string;
  }[]
}

export const AdjustmentStages: React.FC<AdjustmentStagesProps> = ({data, className}) => {
  return (

    <section className={cn("", className)}>
      <Container className={cn(
        "grid grid-cols-12 gap-10",
        "max-md:gap-0 max-md:gap-y-5"
      )}>
        <div className={cn(
          "col-start-1 col-end-9",
          "max-xl:col-end-7",
          "max-md:col-span-full"
        )}>
          <h2 className={cn(
            "text-4xl font-semibold mb-7",
            "max-xl:text-3xl max-xl:mb-5",
            "max-md:text-2xl max-md:mb-3"
          )}>
            В сколько этапов проходит пусконаладка станков с ЧПУ?
          </h2>
          <p className="font-semibold mb-3 max-md:text-sm">
            У станков разных типов процедуры могут отличаться, но есть общие этапы:
          </p>

          <ol className="space-y-3 mb-12 max-md:mb-5">
            {data.map((item, index) => (
              <li key={item.id} className="flex items-start gap-3">
                <div
                  className="min-w-[25px] min-h-[25px] flex items-center justify-center bg-[var(--violet)]/40 text-white font-bold rounded-full text-xs shrink-0">
                  {index + 1}
                </div>
                <p className="text-sm">{item.text}</p>
              </li>
            ))}
          </ol>

          <p className="font-semibold mb-3 max-md:text-sm">Кому и как оказываются услуги запуска станков с ЧПУ?</p>

          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CircleCheck size={20} className={"text-white fill-[var(--violet)]/30 shrink-0"}/>
              <p className={"text-sm"}>
                Если у вас нет опыта выполнения подобных процедур, мы рекомендуем довериться специалистам нашей
                сервисной
                службы.
              </p>
            </li>
            <li className="flex items-start gap-3">
              <CircleCheck size={20} className={"text-white fill-[var(--violet)]/30 shrink-0"}/>
              <p className={"text-sm"}>
                Наши производственные базы находятся в Санкт-Петербурге, Москве, Краснодаре, Екатеринбурге и Минске, а
                наши инженеры работают по всей России.
              </p>
            </li>
          </ul>
        </div>

        <AdjustmentVideo className={cn(
          "col-start-9 col-end-13",
          "max-xl:col-start-7",
          "max-md:col-span-full",
        )}/>

      </Container>
    </section>
  );
}
