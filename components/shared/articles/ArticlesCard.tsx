import {cn} from "@/lib/utils";
import React from "react";
import {Article} from "@/types/types";
import Link from "next/link";
import Image from "next/image";

export const ArticlesCard: React.FC<Article> = (
  {
    name,
    slug,
    description,
    date,
    image,
    articleCategory
  }
) => {

  return (
    <article>
      <Link
        className={cn("group block rounded-xl overflow-hidden mb-3")}
        href={`/articles/${articleCategory[0].slug}/${slug}`}
      >
        <Image
          src={image}
          alt={name}
          width={430}
          height={200}
          className={cn("group-hover:scale-105 group-focus:scale-105 transition-transform duration-300")}
        />
      </Link>
      <p className={"text-xs text-[#9298AF] mb-2"}>{date}</p>
      <Link
        className={cn(
          "block font-semibold text-[22px] text-[var(--violet)] mb-2",
          "hover:text-[var(--red)] focus:text-[var(--red)] leading-5 transition-colors duration-300",
        )}
        href={`/articles/${articleCategory[0].slug}/${slug}`}
      >
        <h2>{name}</h2>
      </Link>
      <p className={"leading-5"}>{description}</p>
    </article>
  );
}
