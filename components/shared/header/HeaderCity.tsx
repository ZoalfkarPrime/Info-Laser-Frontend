'use client'

import React, {useEffect, useState} from 'react';
import {ClassName} from "@/types/types";
import {cn} from "@/lib/utils";
import {ChevronDown} from "lucide-react";
import {Overlay} from "@/components/shared/Overlay";

const citySubdomains: Record<string, string> = {
  "Санкт-Петербург": "spb",
  "Москва": "msk",
  "Казань": "kzn",
  "Воронеж": "vrn",
};

export const HeaderCity: React.FC<ClassName> = ({className}) => {
  const [isSpoilerOpen, setIsSpoilerOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string>("Санкт-Петербург");

  useEffect(() => {
    const storedCity = localStorage.getItem("selectedCity");
    if (storedCity) setSelectedCity(storedCity);
  }, []);

  useEffect(() => {
    if (isSpoilerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isSpoilerOpen]);

  useEffect(() => {
    const updateCityFromURL = () => {
      const hostname = window.location.hostname;
      const subdomain = hostname.split(".")[0];

      let city = "Санкт-Петербург"; // По умолчанию

      for (const [key, value] of Object.entries(citySubdomains)) {
        if (value === subdomain) {
          city = key;
          break;
        }
      }

      setSelectedCity(city);
    };

    updateCityFromURL(); // при загрузке страницы
    window.addEventListener("popstate", updateCityFromURL); // при переходах назад/вперёд

    return () => {
      window.removeEventListener("popstate", updateCityFromURL);
    };
  }, []);


  const handleCitySelect = (city: string) => {
    if (city === selectedCity) return; // Уже выбранный — ничего не делаем

    setSelectedCity(city);
    localStorage.setItem("selectedCity", city);
    setIsSpoilerOpen(false);

    const subdomain = citySubdomains[city];
    const {hostname, pathname, protocol} = window.location;
    const domainParts = hostname.split(".");

    let domain = hostname;

    // Удаляем поддомен, если он есть
    if (domainParts.length > 2) {
      domain = domainParts.slice(1).join(".");
    }

    // Если выбран Санкт-Петербург — редиректим на основной домен
    if (city === "Санкт-Петербург") {
      window.location.href = `${protocol}//${domain}${pathname}`;
    } else {
      // Иначе — редирект с поддоменом
      window.location.href = `${protocol}//${subdomain}.${domain}${pathname}`;
    }
  };

  return (
    <>
      <Overlay isOpen={isSpoilerOpen}/>

      <div className={cn('relative mr-3', className)} onMouseLeave={() => setIsSpoilerOpen(false)}>
        <button
          className={cn(
            'flex items-center gap-x-1 text-[14px] bg-white hover:text-[var(--violet)] transition-colors duration-300',
            isSpoilerOpen ? 'text-[var(--violet)] before:content-[] before:absolute before:left-0 before:bottom-[-40px] before:h-[40px] before:w-full' : '',
          )}
          onMouseEnter={() => setIsSpoilerOpen(true)}
        >
          {selectedCity}
          <ChevronDown
            size={14}
            className={cn(
              "relative transition-all duration-300 ease-in-out",
              isSpoilerOpen ? "top-0.5" : " top-0"
            )}
          />
        </button>

        <div
          className={cn(
            'absolute top-13 right-0 bg-white border-t border-t-gray-300 rounded-md shadow-md transition-all duration-300 z-30',
            "xl:w-max xl:max-w-[250px] xl:rounded-3xl xl:shadow-sm xl:shadow-[#4F26E9]",
            isSpoilerOpen ? 'opacity-100 visible scale-100' : 'opacity-0 invisible scale-95'
          )}
        >
          <ul className={cn(
            "xl:p-1"
          )}>
            {Object.keys(citySubdomains).map((city) => {
              const isSelected = city === selectedCity;

              return (
                <li key={city}>
                  <button
                    disabled={isSelected}
                    className={cn(
                      "block w-full text-left py-2 px-4 text-sm",
                      "xl:px-3 xl:py-2 xl:transition-colors xl:duration-300 xl:ease-in-out xl:rounded-3xl",
                      isSelected
                        ? "text-gray-400 cursor-default"
                        : "hover:text-[var(--violet)] xl:hover:bg-[var(--violet-dark)] xl:hover:cursor-pointer"
                    )}
                    onClick={() => handleCitySelect(city)}
                  >
                    {city}
                  </button>
                </li>
              );
            })}

          </ul>
        </div>
      </div>
    </>
  );
};
