import { JSX } from "react";

export const StringToHtml = (html: string | undefined): JSX.Element => {
  if (!html) return <></>
  return (
    <div dangerouslySetInnerHTML={{ __html: html }} />
  )
}