import {ClassName} from "@/types/types";
import React from "react";
import {AdjustmentHeader} from "@/components/shared/adjustment/AdjustmentHeader";
import {AdjustmentForClients} from "@/components/shared/adjustment/AdjustmentForClients";
import {AdjustmentStages} from "@/components/shared/adjustment/AdjustmentStages";
import {ArticlesOnMain} from "@/components/shared/articles/ArticlesOnMain";
import {SocialBanner} from "@/components/shared/banners/SocialBanner";

const AdjustmentPage: React.FC<ClassName> = () => {

  const data_clients = [
    {
      id: 1,
      name: "Пуск и наладка лазерного оборудования",
      price: 10000,
      second_price: 150000
    },
    {
      id: 2,
      name: "Пуск и наладка фрезерного станка с чпу",
      price: 10000,
      second_price: 150000
    }
  ];

  const data_stages = [
    {
      id: 1,
      text: "Подготовка. Изучение исходных данных, знакомство с оборудованием, проверка комплектации и целостности"
    },
    {
      id: 2,
      text: "Установка оборудования. Станок не должен шататься, должен быть выставлен по уровню, подключен к сети и заземлен"
    },
    {
      id: 3,
      text: "Настройка системы управления. А в некоторых случаях и ПО"
    },
    {
      id: 4,
      text: "Проверка электроники"
    },
    {
      id: 5,
      text: "Проверка в процессе эксплуатации механических элементов оборудования"
    },
    {
      id: 6,
      text: "Подключение систем безопасности: охлаждения, стабилизаторов и т. д."
    },
    {
      id: 7,
      text: "Пробное тестирование работы станка на различных мощностях"
    }
  ];

  return (
    <>
      <section>
        <AdjustmentHeader/>

        <AdjustmentForClients className={"mb-15"} data={data_clients}/>

        <AdjustmentStages className={"mb-25"} data={data_stages}/>

        <ArticlesOnMain className={"mb-15"}/>

        <SocialBanner/>

      </section>
    </>
  );
};

export default AdjustmentPage;
