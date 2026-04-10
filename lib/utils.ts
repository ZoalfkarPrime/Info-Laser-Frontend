import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const formatPrice = (price: number) => price.toLocaleString("ru-RU").replace(/\s/g, ".");

export const normalizeHtml = (html: string) => html.replaceAll("<p>", "").replaceAll("</p>", "").replaceAll("&nbsp;", "")