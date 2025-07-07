import {Container} from "@/components/shared/Container";
import React from "react";
import Image from "next/image";
import {getTranslations} from "next-intl/server";
import {cn} from "@/lib/utils";
import {getOneArticleBySlug} from "@/api/api";
import {SocialList} from "@/components/shared/social/SocialList";
import {ChevronLeft, CircleCheck} from "lucide-react";
import Link from "next/link";
import {ArticlesSimilar} from "@/components/shared/articles/ArticlesSimilar";
import {Button} from "@/components/ui/Button";
import {SocialAndOnlineMini} from "@/components/shared/banners/SocialAndOnlineMini";

interface ArticlePageProps {
  params: Promise<{ article: string; blog: string }>;
}

export async function generateMetadata(
  {
    params: paramsPromise,
  }: {
    params: Promise<{ locale: string; article: string }>;
  }) {
  const {locale, article} = await paramsPromise;
  const t = await getTranslations({locale});

  const oneArticle = await getOneArticleBySlug(article);
  
  return {
    title: oneArticle?.name || t("blogMetaTitle"),
    description: t("blogMetaDescription"),
  };
}

export default async function ArticlePage({params}: ArticlePageProps) {
  const {article} = await params;
  const oneArticle = await getOneArticleBySlug(article);

  if (!oneArticle) {
    return (
      <Container>
        <p className="text-red-500">Статья не найдена</p>
      </Container>
    );
  }

  const data_table = [
    {
      id: 1,
      equipment: "Laser Testing to BS EN",
      model: "60825-1:",
      model_2: "2014 +A1:",
      year: "2021"
    },
    {
      id: 2,
      equipment: "LED and Lamp Testing to BS EN / IEC",
      model: "60601-2-22:",
      model_2: "2124 +b1:",
      year: "2024"
    },
    {
      id: 3,
      equipment: "Laser Testing to BS EN",
      model: "60825-1:",
      model_2: "2014 +A1:",
      year: "2021"
    },
    {
      id: 4,
      equipment: "LED and Lamp Testing to BS EN / IEC",
      model: "60601-2-22:",
      model_2: "2124 +b1:",
      year: "2024"
    }
  ];
  const data_articles = {
    allArticles: [
      {
        id: 6,
        name: "MAIN MAIN MAIN",
        slug: "main-main-main",
        description: "Сегодня WERT WERT EWRTW ",
        isMain: Boolean(1),
        date: "14.05.2025",
        image: "/img/articles/articles-main/1.jpg",
        articleCategory: [
          {
            id: 1,
            name: "Инструкции по настройке и эксплуатации лазерного оборудования",
            slug: "instrukcii",
          },
        ],
      },
      {
        id: 2,
        name: "Как работает лазерный маркиратор 2",
        slug: "kak-rabotaet-lazernyy-markirator-2",
        description: "Сегодня лазерный маркер является самым производительным скоростным типом оборудования",
        isMain: Boolean(0),
        date: "14.05.2025",
        image: "/img/articles/articles-main/1.jpg",
        articleCategory: [
          {
            id: 1,
            name: "Инструкции по настройке и эксплуатации лазерного оборудования",
            slug: "instrukcii",
          },
        ],
      },
      {
        id: 14,
        name: "Как работает лазерный маркиратор-3",
        slug: "kak-rabotaet-lazernyy-markirator-3",
        description: "Сегодня лазерный маркер является самым производительным скоростным типом оборудования",
        isMain: Boolean(0),
        date: "14.05.2025",
        image: "/img/articles/articles-main/1.jpg",
        articleCategory: [
          {
            id: 1,
            name: "Инструкции по настройке и эксплуатации лазерного оборудования",
            slug: "instrukcii",
          },
        ],
      },
    ],
  };

  return (
    <article>
      <Container>
        <div className="grid grid-cols-12">
          <header className="col-span-full mb-10 max-md:mb-3">
            <h1 className={cn(
              "text-5xl font-semibold mb-5",
              "max-lg:text-3xl",
              "max-md:text-2xl",
            )}>{oneArticle.name}</h1>
            <div className="grid grid-cols-12 gap-5 mb-5 max-md:gap-3">
              <p className={cn(
                "col-start-1 col-end-2 text-sm text-[var(--gray-text)]",
                "max-lg:col-start-1 max-lg:col-end-5 max-lg:text-xs",
              )}>
                Дата:
                <time className="ml-2 text-black" dateTime={oneArticle.date}>
                  {oneArticle.date}
                </time>
              </p>
              <p className={cn(
                "col-start-2 col-end-5 text-sm text-[var(--gray-text)] text-center",
                "max-lg:col-start-5 max-lg:col-end-13 max-lg:text-xs"
              )}>
                Автор:
                <span className="ml-2 text-black">Алексей Тихонов</span>
              </p>
              <p className={cn(
                "col-start-8 col-end-13 text-sm text-[var(--gray-text)] text-right",
                "max-lg:col-start-1 max-lg:col-end-13 max-lg:text-start max-lg:text-xs"
              )}>
                Раздел:
                <span className="ml-2 text-black">{oneArticle.articleCategory[0].name}</span>
              </p>
            </div>
            <Image
              className="w-full max-h-[615px] rounded-3xl"
              src={oneArticle.image}
              alt={oneArticle.name}
              width={1380}
              height={615}
              priority
            />
          </header>
          <div className={cn("relative grid grid-cols-12 col-span-full")}>
            <aside className={cn(
              "col-start-1 col-end-2 sticky top-5 h-max",
              "max-lg:relative max-lg:order-3 max-lg:col-span-full max-lg:flex max-lg:gap-x-5 max-lg:items-center max-lg:py-3"
            )}>
              <p className="font-semibold mb-3 text-center max-lg:text-start max-lg:mb-0 max-md:text-sm">Соцсети</p>
              <SocialList className={cn(
                "flex-col items-center",
                "max-lg:flex-row"
              )}/>
            </aside>
            <div
              className={cn(
                "relative -top-50 col-start-2 col-end-10 bg-white rounded-3xl p-10 border border-[var(--gray-text)]",
                "max-lg:top-0 max-lg:order-2 max-lg:col-span-full max-lg:border-0 max-lg:p-0"
              )}>
              <p className={"font-semibold mb-3 max-md:text-sm"}>
                Одним из самых популярных и стремительно развивающихся
                способов резки металлов является лазерная резка.
                Из года в год он активно развивается и преодолевает все стандартные показатели лазерных станков:
              </p>
              <ul className="space-y-2 mb-5 max-md:text-sm max-md:mb-3">
                <li className="flex items-center gap-3">
                  <CircleCheck size={20} className={"text-white fill-[var(--violet)]/70 shrink-0"}/>
                  <p>
                    Скорость резки
                  </p>
                </li>
                <li className="flex items-center gap-3">
                  <CircleCheck size={20} className={"text-white fill-[var(--violet)]/70 shrink-0"}/>
                  <p>
                    Максимальную толщину разрезаемого материала
                  </p>
                </li>
                <li className="flex items-center gap-3">
                  <CircleCheck size={20} className={"text-white fill-[var(--violet)]/70 shrink-0"}/>
                  <p>
                    Срок эксплуатации лазерных станков
                  </p>
                </li>
              </ul>
              <p className={"mb-5 max-md:text-sm max-md:mb-3"}>
                Такой станок с лёгкостью режет металл толщиной до 80 мм! И как показывает практика, это далеко не
                предел.
              </p>
              <p className={"mb-5 max-md:text-sm max-md:mb-3"}>
                В этой статье речь пойдёт об основных принципах работы лазерных станков для резки металлов, а также их
                преимуществах перед другими способами резки. Также мы расскажем, какие металлы лучше подходят для резки
                и что из них можно изготовить.
              </p>
              <div className={"grid grid-cols-12 gap-x-5 mb-8"}>
                <h2
                  id="how-laser-machine-works"
                  className={cn(
                    "col-span-full text-[40px] leading-11 font-semibold mb-5",
                    "max-xl:text-3xl max-xl:leading-9",
                    "max-md:text-2xl max-md:leading-7 max-md:mb-3"
                  )}
                >
                  Как работает станок для лазерной резки металла?
                </h2>
                <div className={"col-start-1 col-end-7 max-md:col-span-full"}>
                  <p className={"mb-5 max-md:text-sm max-md:mb-3"}>
                    Для начала разберёмся в специфике работы лазерного станка.
                  </p>
                  <p className={"mb-5 max-md:text-sm max-md:mb-3"}>
                    В современных лазерных станках по металлу используются волоконные излучатели в качестве генератора
                    лазерного излучения. Процесс генерации происходит в диодах накачки с помощью резонатора. Далее
                    лазерный луч по оптоволокну подаётся в лазерную голову станка по металлу, где находятся
                    коллиматорная
                    и фокусирующая линза.
                  </p>
                  <p className={"max-md:text-sm max-md:mb-3"}>
                    Сгенерированный лазерный луч обладает высокой плотностью мощности благодаря двум важным свойствам:
                    монохроматичности и когерентности.
                  </p>
                </div>
                <Image
                  className={"col-start-7 col-end-13 max-md:col-span-full"}
                  src={'/img/articles/article/article-machine.jpg'}
                  width={420}
                  height={360}
                  alt="Как работает станок для лазерной резки металла?"
                />
              </div>
              <h3 className={"text-4xl font-semibold mb-5 max-md:text-2xl max-md:mb-3"}>
                Разберёмся подробнее, что это значит.
              </h3>
              <ul className="space-y-2 mb-8 max-lg:mb-5 max-md:mb-3 max-md:text-sm">
                <li className="flex items-start gap-3">
                  <CircleCheck size={20} className={"text-white fill-[var(--violet)]/70 shrink-0"}/>
                  <p>
                    <span className={"inline-block font-semibold"}>Монохроматичность</span> — это когда фотоны лазерного
                    излучения имеют одну и ту же длину волны.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <CircleCheck size={20} className={"text-white fill-[var(--violet)]/70 shrink-0"}/>
                  <p>
                    <span className={"inline-block font-semibold"}>Когерентность</span> — это то, насколько согласованны
                    волновые колебания лазера. Обычно выделяют два вида
                    когерентности: временная и пространственная.
                  </p>
                </li>
              </ul>
              <h3 className={"text-4xl font-semibold mb-5 max-md:text-2xl max-md:mb-3"}>
                Разберёмся подробнее, что это значит.
              </h3>
              <ol className="space-y-2 mb-8 max-lg:mb-5 max-md:mb-3 max-md:text-sm">
                <li className="flex items-start gap-3">
                  <div
                    className="min-w-[22px] min-h-[22px] flex items-center justify-center bg-[var(--violet)]/40 text-white font-bold rounded-full text-xs shrink-0">
                    1
                  </div>
                  <p>
                    <span className={"inline-block font-semibold mr-2"}>Временная когерентность</span>
                    обеспечивает согласованность колебаний в одной и той же точке пространства в разное время. Другими
                    словами, это способность лазера излучать свет с последовательным и предсказуемым соотношением фаз с
                    течением времени.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div
                    className="min-w-[22px] min-h-[22px] flex items-center justify-center bg-[var(--violet)]/40 text-white font-bold rounded-full text-xs shrink-0">
                    2
                  </div>
                  <p>
                    <span className={"inline-block font-semibold mr-2"}>Пространственная когерентность</span>
                    обеспечивает однонаправленность излучения и достижение минимального значения пятна лазерного луча.
                    То есть это относится к способности лазерного луча оставаться сфокусированным и сохранять четкую и
                    четко очерченную форму при его перемещении в пространстве.
                  </p>
                </li>
              </ol>
              <p className={"mb-5 max-md:text-sm max-md:mb-3"}>
                Это происходит потому, что фотоны в лазерном луче синфазны и имеют постоянную фазовую зависимость друг
                от друга, что позволяет им усиливать друг друга и создавать высококонцентрированный пучок света
                (лазера).
              </p>
              <p className={"mb-5 max-md:text-sm max-md:mb-3"}>
                Но как эти свойства влияют на работу лазерного станка по металлу?
              </p>
              <Image
                className={"rounded-3xl mb-5 max-md:mb-3"}
                src={'/img/articles/article/article-example.jpg'}
                width={860}
                height={574}
                alt="Как работает станок для лазерной резки металла?"
              />
              <p className={"mb-5 max-md:text-sm max-md:mb-3"}>
                С помощью данных свойств лазерный станок фокусируется в точку диаметром 0,01 мм с плотностью мощности 10
                Вт и более. Излучение за доли секунды плавит металл в точке, диаметр которой в 8 раз меньше
                человеческого волоса!
              </p>
              <p className={"mb-5 max-md:text-sm max-md:mb-3"}>
                По методу воздействия лазерная резка металла разделяется на два основных способа: резку плавлением и
                сублимационную резку.
              </p>
              <table className={cn(
                "w-full text-sm bg-[var(--gray)] rounded-3xl overflow-hidden mb-10",
                "max-lg:mb-5 max-md:text-xs"
              )}>
                <thead className="font-semibold border-b border-gray-500">
                <tr className="grid grid-cols-12 gap-3 p-5 maxmd:p-2 max-md:gap-2">
                  <th className="col-start-1 col-end-6 text-left">Equipment</th>
                  <th className="col-start-6 col-end-8 text-left">Model</th>
                  <th className="col-start-8 col-end-12 text-left">Model v2</th>
                  <th className="col-start-12 col-end-13 text-left">Year</th>
                </tr>
                </thead>
                <tbody>
                {data_table.map((item) => (
                  <tr
                    key={item.id}
                    className="grid grid-cols-12 gap-3 items-center p-5 border-b border-gray-300 last:border-none"
                  >
                    <td className="col-start-1 col-end-6">{item.equipment}</td>
                    <td className="col-start-6 col-end-8">{item.model}</td>
                    <td className="col-start-8 col-end-12">{item.model_2}</td>
                    <td className="col-start-12 col-end-13">{item.year}</td>
                  </tr>
                ))}
                </tbody>
              </table>
              <h2
                id="laser-different"
                className={cn(
                  "text-[40px] font-semibold leading-11 mb-5",
                  "max-lg:text-3xl max-lg:leading-9 max-lg:mb-3",
                  "max-md:text-2xl max-md:leading-7"
                )}
              >
                Главные отличия лазерной резки от других методов резки металла
              </h2>
              <p className={"mb-5 max-md:text-sm max-md:mb-3"}>
                Мы выяснили, что лазерная резка металла является очень эффективным способом резки металла. Но что же
                отличает именно этот способ от других возможных?
              </p>
              <ol className="space-y-2 mb-10 max-lg:mb-5 max-md:mb-3 max-md:text-sm">
                <li className="flex items-start gap-3">
                  <div
                    className="min-w-[22px] min-h-[22px] flex items-center justify-center bg-[var(--violet)]/40 text-white font-bold rounded-full text-xs shrink-0">
                    1
                  </div>
                  <p>
                    <span className={"inline-block font-semibold mr-1"}>Скорость работы:</span>
                    она у лазерных станков по металлу Wattsan, особенно тонколистовых, доходит до 60 м/мин. А скорость
                    холостых передвижений достигает 140 м/мин
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div
                    className="min-w-[22px] min-h-[22px] flex items-center justify-center bg-[var(--violet)]/40 text-white font-bold rounded-full text-xs shrink-0">
                    2
                  </div>
                  <p>
                    <span className={"inline-block font-semibold mr-1"}>Идеальный рез.</span>
                    Металл после резки не требует постобработки и сразу может быть использован по назначению
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div
                    className="min-w-[22px] min-h-[22px] flex items-center justify-center bg-[var(--violet)]/40 text-white font-bold rounded-full text-xs shrink-0">
                    3
                  </div>
                  <p>
                    <span className={"inline-block font-semibold mr-1"}>Отсутствие расходных материалов.</span>
                    В работе лазерного станка по металлу расходные материалы
                    отсутствуют
                    или имеют невысокую стоимость. Основным расходом является сам материал и сопутствующие газы
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div
                    className="min-w-[22px] min-h-[22px] flex items-center justify-center bg-[var(--violet)]/40 text-white font-bold rounded-full text-xs shrink-0">
                    4
                  </div>
                  <p>
                    <span className={"inline-block font-semibold mr-1"}>Легко обучиться.</span>
                    Основные принципы лазерной резки металлов и работы на лазерном станке по металлу можно освоить за
                    один рабочий день
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div
                    className="min-w-[22px] min-h-[22px] flex items-center justify-center bg-[var(--violet)]/40 text-white font-bold rounded-full text-xs shrink-0">
                    5
                  </div>
                  <p>
                    <span className={"inline-block font-semibold mr-1"}>Срок службы.</span>
                    Ресурс лазерных станков по металлу — более 11 лет
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div
                    className="min-w-[22px] min-h-[22px] flex items-center justify-center bg-[var(--violet)]/40 text-white font-bold rounded-full text-xs shrink-0">
                    6
                  </div>
                  <p>
                    <span className={"inline-block font-semibold mr-1"}>Экологичность.</span>
                    В процессе работы отсутствуют отходы
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div
                    className="min-w-[22px] min-h-[22px] flex items-center justify-center bg-[var(--violet)]/40 text-white font-bold rounded-full text-xs shrink-0">
                    7
                  </div>
                  <p>
                    <span className={"inline-block font-semibold mr-1"}>Простота и безопасность в использовании.</span>
                    Не требует особых навыков для работы, а также специального помещения и защитных костюмов
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div
                    className="min-w-[22px] min-h-[22px] flex items-center justify-center bg-[var(--violet)]/40 text-white font-bold rounded-full text-xs shrink-0">
                    8
                  </div>
                  <p>
                    <span className={"inline-block font-semibold mr-1"}>Высокая точность.</span>
                    Диаметр лазера — 0,01 мм, точность – 0,02 мм
                  </p>
                </li>
              </ol>
              <h2
                id="which-metals-can-be-sliced"
                className={cn(
                  "text-[40px] font-semibold leading-11 mb-5",
                  "max-lg:text-3xl max-lg:leading-9 max-lg:mb-3",
                  "max-md:text-2xl max-md:leading-7"
                )}
              >
                Какие металлы можно резать?
              </h2>
              <p className={"font-semibold mb-5 max-md:text-sm max-md:mb-3"}>
                Лучше всего для данного способа резки подойдут следующие металлы:
              </p>
              <ul className="space-y-2 mb-5 max-md:mb-3 max-md:text-sm">
                <li className="flex items-start gap-3">
                  <CircleCheck size={20} className={"text-white fill-[var(--violet)]/70 shrink-0"}/>
                  <p>
                    углеродистая сталь
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <CircleCheck size={20} className={"text-white fill-[var(--violet)]/70 shrink-0"}/>
                  <p>
                    оцинкованная сталь
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <CircleCheck size={20} className={"text-white fill-[var(--violet)]/70 shrink-0"}/>
                  <p>
                    легированная
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <CircleCheck size={20} className={"text-white fill-[var(--violet)]/70 shrink-0"}/>
                  <p>
                    нержавеющая сталь
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <CircleCheck size={20} className={"text-white fill-[var(--violet)]/70 shrink-0"}/>
                  <p>
                    медь
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <CircleCheck size={20} className={"text-white fill-[var(--violet)]/70 shrink-0"}/>
                  <p>
                    латунь
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <CircleCheck size={20} className={"text-white fill-[var(--violet)]/70 shrink-0"}/>
                  <p>
                    алюминий
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <CircleCheck size={20} className={"text-white fill-[var(--violet)]/70 shrink-0"}/>
                  <p>
                    титан
                  </p>
                </li>
              </ul>
              <p className={"mb-10 max-lg:mb-5 max-md:text-sm max-md:mb-3"}>
                При наличии специального модуля станки также смогут резать трубы круглого и прямоугольного сечения.
              </p>
              <div className={"bg-[var(--gray-text)]/15 rounded-3xl p-5"}>
                <h2 className={"text-2xl font-semibold mb-7 max-lg:mb-5 max-md:text-xl max-md:mb-3"}>Выводы</h2>
                <p className={"mb-5 max-md:text-sm max-md:mb-3"}>
                  Это происходит потому, что фотоны в лазерном луче синфазны и имеют постоянную фазовую зависимость друг
                  от друга, что позволяет им усиливать друг друга и создавать высококонцентрированный пучок света
                  (лазера).
                </p>
                <p className={"max-md:text-sm"}>
                  Но как эти свойства влияют на работу лазерного станка по металлу?
                </p>
              </div>
            </div>
            <aside className={cn(
              "col-start-10 col-end-13 pl-5 sticky top-5 h-max",
              "max-lg:relative max-lg:order-1 max-lg:col-span-full max-lg:top-0 max-lg:mb-3 max-lg:pl-0"
            )}>
              <p className={cn(
                "text-2xl font-semibold mb-5",
                "max-md:text-lg max-md:mb-3"
              )}>Оглавление</p>
              <ul className={"space-y-2"}>
                <li>
                  <Link
                    className={cn(
                      "flex gap-2 text-sm transition-colors",
                      "hover:text-[var(--violet)] focus:text-[var(--violet)]",
                      "max-md:text-xs"
                    )}
                    href={"#how-laser-machine-works"}
                  >
                    <ChevronLeft
                      size={20}
                      className="flex-shrink-0 relative text-[var(--violet)] rotate-180"
                    />
                    Как работает станок для лазерной резки металла?
                  </Link>
                </li>
                <li>
                  <Link
                    className={cn(
                      "flex gap-2 text-sm transition-colors",
                      "hover:text-[var(--violet)] focus:text-[var(--violet)]",
                      "max-md:text-xs"
                    )}
                    href={"#laser-different"}
                  >
                    <ChevronLeft
                      size={20}
                      className="flex-shrink-0 relative text-[var(--violet)] rotate-180"
                    />
                    Главные отличия лазерной резки от других методов резки металла
                  </Link>
                </li>
                <li>
                  <Link
                    className={cn(
                      "flex gap-2 text-sm transition-colors",
                      "hover:text-[var(--violet)] focus:text-[var(--violet)]",
                      "max-md:text-xs"
                    )}
                    href={"#which-metals-can-be-sliced"}
                  >
                    <ChevronLeft
                      size={20}
                      className="flex-shrink-0 relative text-[var(--violet)] rotate-180"
                    />
                    Какие металлы можно резать?
                  </Link>
                </li>
              </ul>
            </aside>
          </div>
        </div>
        <section className={"pt-5 pb-20 max-lg:pb-10"}>
          <div className={"flex justify-between items-center mb-5"}>
            <h2 className={cn(
              "text-[40px] font-semibold",
              "max-lg:text-3xl",
              "max-md:text-2xl"
            )}>Похожие статьи</h2>
            <Button
              asChild
              variant="outline"
              className={"text-[var(--violet)] rounded-3xl border-2 !border-[var(--violet-dark)] max-md:text-xs"}
            >
              <Link href="/articles">Все статьи</Link>
            </Button>
          </div>
          <ArticlesSimilar articles={data_articles.allArticles}/>
        </section>
      </Container>
      <SocialAndOnlineMini/>
    </article>
  );
};