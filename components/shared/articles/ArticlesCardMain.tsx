import React from "react";
import {Article} from "@/types/types";
import Link from "next/link";
import Image from "next/image";
import {cn} from "@/lib/utils";

export const ArticlesCardMain: React.FC<Article> = (
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
    <article className={"block group relative rounded-3xl overflow-hidden"}>
      <Link
        href={`/blog/${articleCategory[0].slug}/${slug}`}

      >

        <div className={"absolute bottom-10 left-10 bg-white rounded-3xl p-5 max-w-[420px] z-30"}>
          <p className={"text-xs text-[#9298AF] mb-2"}>{date}</p>
          <h2 className={cn(
            "text-[22px] text-[var(--violet)] font-semibold mb-2",
            "group-hover:text-[var(--red)] group-focus:text-[var(--red)] transition-colors duration-300"
          )}
          >
            {name}
          </h2>
          <p className={"text-sm"}>{description}</p>
        </div>

        <Image
          src={image}
          alt={name}
          className={cn(
            "rounded-xl w-full h-full object-cover z-20",
            "group-hover:scale-105 group-focus:scale-105 transition-transform duration-300"
          )}
          width={"640"}
          height={"300"}
        />

      </Link>
    </article>
  );
}
