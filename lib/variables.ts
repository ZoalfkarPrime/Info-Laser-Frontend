import type {YMapLocationRequest} from "@yandex/ymaps3-types";

export const PHONE = "8 (800) 222-27-41";
export const EMAIL = "info@infolaser.ru";
export const STORAGE_MSK = "140101, г. Раменское, ул. Михалевича, 4";
export const STORAGE_SPB = "195213, г. Санкт-Петербург, Дальневосточный проспект, д. 100";
export const PERSONAL_AGREEMENT = "/files/docs/personal-agreement.txt";
export const REQUISITES = "/files/docs/requisites.txt";

export const deliveryLocation: YMapLocationRequest = {
  center: [35, 57.4],
  zoom: 5,
};

export const deliveryPlaces = [
  {
    id: "1",
    label: "г. Раменское",
    text: "ул. Михалевича",
    longitude: 38.247660,
    latitude: 55.561726,
  },
  {
    id: "2",
    label: "г. Санкт-Петербург",
    text: "Дальневосточный проспект, д. 100, корп. 49",
    longitude: 30.491561,
    latitude: 59.876147,
  },
];
