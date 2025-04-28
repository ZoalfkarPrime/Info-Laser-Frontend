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
      <Container className={"grid grid-cols-12 gap-10"}>
        <div className={"col-start-1 col-end-9"}>
          <h2 className="text-4xl font-semibold mb-7">В сколько этапов проходит пусконаладка станков с ЧПУ?</h2>
          <p className="font-semibold mb-3">У станков разных типов процедуры могут отличаться, но есть общие этапы:</p>

          <ol className="space-y-3 mb-12">
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

          <h3 className="font-semibold mb-3">Кому и как оказываются услуги запуска станков с ЧПУ?</h3>

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

        <AdjustmentVideo className={"col-start-9 col-end-13"}/>

      </Container>

    </section>

  );
}
