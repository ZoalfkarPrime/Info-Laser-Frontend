import React, {Fragment} from 'react';
import Link from "next/link";
import Image from "next/image";
import {cn, formatPrice} from "@/lib/utils";
import {Check, Clock3, Star} from "lucide-react";
import {Button} from "@/components/ui/Button";
import {Product} from "@/types/types";
import {AddToCartBtn} from "@/components/shared/btns/AddToCartBtn";

export const ProductCard: React.FC<Product> = (
  {
    id,
    name,
    slug,
    orderPrice,
    stockPrice,
    newPrice,
    inStock,
    rating,
    guarantee,
    guaranteeContent,
    categories,
    labels,
    product_attachments,
    category_ids,
    className,
    onClick
  }) => {

  return (
    <div
      className={cn('relative flex flex-col h-full overflow-hidden bg-[var(--gray)] border border-gray-200 rounded-3xl p-2', className)}>

      {labels && labels.map((label) => (
        (label.slug === 'hit' || label.slug === 'in_sale' || label.slug === 'new') && (
          <p
            key={label.id}
            className={cn(
              "absolute block w-[73px] h-[73px] text-[15px] top-[-28px] left-[-28px] rounded-full text-white uppercase z-20",
              label.slug === 'hit' ? "bg-[var(--green)] -rotate-45" : "bg-[var(--pink)] rotate-0",
              label.slug === 'new' ? "bg-[var(--green)]" : ""
            )}
          >
          <span
            className={cn(
              "absolute ",
              label.slug === 'hit' ? "right-[21px] bottom-[6px]" : "right-[16px] bottom-[11px] font-semibold",
              label.slug === 'new' ? "-rotate-45 right-[3px]" : "",
            )}
          >
            {label.slug === 'hit' ? "хит" : ""}
            {label.slug === 'new' ? "new" : ""}
            {label.slug === 'in_sale' ? "%" : ""}
          </span>
          </p>
        )
      ))}

      <Link
        className="flex justify-center mb-2 overflow-hidden min-h-[220px]"
        href={`/catalog/${categories?.[0]?.slug ?? "default-category"}/${slug}`}
        onClick={onClick}
      >
        {product_attachments && product_attachments.map((item) =>
            Boolean(item && item.is_main) && (
              <Image
                key={item.id}
                className="hover:scale-110 transition-transform z-10"
                src={item.external_url}
                alt={item.name}
                width={220}
                height={220}
              />
            )
        )}
      </Link>

      <div className="flex flex-col p-3 h-full">
        {Boolean(inStock) ?
          (
            <span
              className="inline-flex items-center gap-x-1 place-self-start text-xs text-[var(--violet)] bg-[var(--violet-dark)] rounded-2xl p-2 mb-3 leading-none">
              <Check className="text-[var(--violet)]" size={12}/>
              В наличии
            </span>
          ) :
          (
            <span
              className="inline-flex items-center gap-x-1 place-self-start text-xs text-[var(--green)] bg-[var(--green)] rounded-2xl p-2 mb-3 leading-none">
              <Clock3 className='text-[var(--green)]' size={12}/>
              Под заказ
            </span>
          )
        }

        <Link
          className="flex-auto hover:text-[var(--violet)] focus:text-[var(--violet)] text-[18px] font-semibold transition-colors leading-5 mb-3 block"
          href={`/catalog/${categories?.[0]?.slug ?? "default-category"}/${slug}`}
          onClick={onClick}
        >
          <h3>{name}</h3>
        </Link>

        <dl className="flex justify-between mb-3">
          {Boolean(inStock) && (
            <div>
              <dt className={"text-xs"}>Цена без НДС</dt>
              <dd>
                <b className="text-[18px]">
                  {formatPrice(stockPrice)}
                  <span className="ml-1">₽</span>
                </b>
              </dd>
            </div>
          )}

          <div>
            <dt className={"text-xs"}>Под заказ без НДС</dt>
            <dd>
              <b className="text-[18px]">
                {formatPrice(orderPrice)}
                <span className="ml-1">₽</span>
              </b>
            </dd>

            {labels?.some((label) => label.slug === "in_sale") && (
              <Fragment>
                <dt className="hidden">Акционная цена</dt>
                <dd className="inline-block bg-black/7 px-2 py-1 rounded-3xl">
                  <b className="text-[15px] font-normal line-through">
                    {formatPrice(newPrice)}
                    <span className="ml-1">₽</span>
                  </b>
                </dd>
              </Fragment>
            )}
          </div>
        </dl>

        <div className={"flex items-center justify-between gap-3 mb-3"}>
          <Button asChild className='flex-1 rounded-3xl py-5'>
            <Link href={`/catalog/${categories?.[0]?.slug ?? "default-category"}/${slug}`}>Узнать больше</Link>
          </Button>

          <AddToCartBtn
            product={{
              id,
              name,
              slug,
              categories,
              product_attachments,
              inStock,
              orderPrice,
              stockPrice,
              newPrice,
              labels,
              rating,
              category_ids,
            }}
          />
        </div>

        <div className={"flex items-center text-xs gap-x-5"}>
          <span className="flex items-center justify-center gap-x-1 text-center leading-none">
            <Star className={"fill-[var(--gold)]"} strokeWidth={0} size={12}/>
            {rating}
          </span>
          <p className="flex items-center justify-center gap-x-1 text-center leading-none">
            <Check className="text-[var(--violet)]" size={12}/>
            {guaranteeContent} {guarantee} год
          </p>
        </div>
      </div>
    </div>
  );
};
