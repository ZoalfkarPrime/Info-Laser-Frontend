import React from 'react';
import Link from "next/link";
import Image from "next/image";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/Button";
import {Product} from "@/types/types";

export const ProductCardHeader: React.FC<Product> = (
  {
    name,
    slug,
    categories,
    className,
    product_attachments,
    onClick
  }) => {

  return (
    <div
      className={cn('relative flex flex-col h-full overflow-hidden bg-[var(--gray)] border border-gray-200 rounded-3xl p-2', className)}>

      <Link
        className="flex justify-center mb-2 overflow-hidden max-h-[250px]"
        href={`/catalog/${categories && categories[0].slug}/${slug}`}
        onClick={onClick}
      >
        {product_attachments && product_attachments.map((item) =>
            Boolean(item && item.is_main) && (
              <Image
                key={item.id}
                className="hover:scale-110 transition-transform z-10"
                src={item.external_url}
                alt={item.name}
                width={item.width}
                height={item.height}
              />
            )
        )}
      </Link>

      <div className="flex flex-col p-3">

        <Link
          className="flex-auto hover:text-[var(--violet)] focus:text-[var(--violet)] text-lg font-semibold transition-colors leading-5 mb-3 block"
          href={`/catalog/${categories && categories[0].slug}/${slug}`}
          onClick={onClick}
        >
          <h3>{name}</h3>
        </Link>

        <div className={"flex items-center justify-between gap-3 mb-3"}>
          <Button asChild className='flex-1 rounded-3xl py-5'>
            <Link href={`/catalog/${categories && categories[0].slug}/${slug}`}>Узнать больше</Link>
          </Button>
        </div>

      </div>
    </div>
  );
};
