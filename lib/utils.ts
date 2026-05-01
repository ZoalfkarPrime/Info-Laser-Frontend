import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const formatPrice = (price: number) => price.toLocaleString("ru-RU").replace(/\s/g, ".");

export const normalizeHtml = (html: string | undefined) => html?.replaceAll("<p>", "").replaceAll("</p>", "").replaceAll("&nbsp;", "") ?? ""

export const decodeHtml = (html: string | undefined) => {
  if (!html) return "";
  return html
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&laquo;/g, "«")
    .replace(/&raquo;/g, "»")
    .replace(/&rdquo;/g, "”")
    .replace(/&ldquo;/g, "“");
};
