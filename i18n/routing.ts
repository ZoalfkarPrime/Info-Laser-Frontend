import {defineRouting} from 'next-intl/routing';

const isDev = process.env.NODE_ENV === 'development';

export const routing = defineRouting({
  locales: ["spb", "msk", "kzn",],
  defaultLocale: "spb",
  // localeDetection: false,
  // localeCookie: false,
  localePrefix: "never",
  domains: [
    {
      domain: isDev ? "localhost:3000" : "infolasers.ru",
      defaultLocale: "spb",
      locales: ["spb"]
    },
    {
      domain: isDev ? "msk.localhost:3001" : "msk.infolasers.ru",
      defaultLocale: "msk",
      locales: ["msk"]
    },
    {
      domain: isDev ? "kzn.localhost:3002" : "kzn.infolasers.ru",
      defaultLocale: "kzn",
      locales: ["kzn"]
    }
  ]
});
