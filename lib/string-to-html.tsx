import { JSX } from "react";

export const StringToHtml = (html: string): JSX.Element => {
  return (
    <div dangerouslySetInnerHTML={{ __html: html }} />
  )
}