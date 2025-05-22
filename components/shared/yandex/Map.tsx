'use client';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {ReactifiedModule} from '@yandex/ymaps3-types/reactify/reactify';
import {cn} from "@/lib/utils";
import {ClassName} from "@/types/types";
import {MapPin} from "lucide-react";
import type {YMapLocationRequest} from "@yandex/ymaps3-types";

// 👇 Импортируем типы глобально для этого файла
/// <reference types="@yandex/ymaps3-types/global" />

// 👇 Расширяем глобальный window тут же (локально для этого файла)
declare global {
  interface Window {
    ymaps3: typeof ymaps3;
  }
}

type ReactifiedApi = ReactifiedModule<typeof ymaps3>;

interface Place {
  id: string;
  label: string;
  text: string;
  longitude: number;
  latitude: number;
}

interface MapProps extends ClassName {
  places: Place[];
  location: YMapLocationRequest;
}

const Map: React.FC<MapProps> = ({className, places, location}) => {
  const [reactifiedApi, setReactifiedApi] = React.useState<ReactifiedApi | null>(null);

  React.useEffect(() => {
    const waitForYmaps = () => {
      if (typeof window !== 'undefined' && window.ymaps3) {
        Promise.all([
          window.ymaps3.import('@yandex/ymaps3-reactify'),
          window.ymaps3.ready
        ]).then(([{reactify}]) => {
          const api = reactify.bindTo(React, ReactDOM).module(window.ymaps3);
          setReactifiedApi(api);
        });
      } else {
        setTimeout(waitForYmaps, 300);
      }
    };

    waitForYmaps();
  }, []);

  if (!reactifiedApi) {
    return <div className="text-center py-10 text-gray-500">Загрузка карты...</div>;
  }

  const {
    YMap,
    YMapDefaultSchemeLayer,
    YMapDefaultFeaturesLayer,
    YMapMarker
  } = reactifiedApi;

  return (
    <YMap className={cn("", className)} location={location}>
      <YMapDefaultSchemeLayer/>
      <YMapDefaultFeaturesLayer/>
      {places.map((place) => (
        <YMapMarker
          key={place.id}
          coordinates={[place.longitude, place.latitude]}
        >
          <MapPin className="fill-red-500 size-8"/>
        </YMapMarker>
      ))}
    </YMap>
  );
};

export default Map;
