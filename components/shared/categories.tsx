import {cn} from '@/lib/utils';
import React from 'react';
import Link from "next/link";

interface Props {
  className?: string;
}

const categories = [
  {name: 'Лазерный станок', slug: 'lazernyie-stanki-po-metallu'},
  {name: 'Лазерный станок по металлу', slug: 'metal-laser-machine'},
  {name: 'Лазерный гравер', slug: 'laser-engraver'},
  {name: 'Лазерный маркер', slug: 'laser-marker'},
  {name: 'Листогибы', slug: 'sheet-benders'},
  {name: 'Сварка и очистка', slug: 'welding-cleaning'},
];
const activeIndex = 0;

export const Categories: React.FC<Props> = ({className}) => {
  return (
    <div className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}>
      {
        categories.map((category, index) => (
          <Link
            href={`/catalog/${category.slug}`}
            className={cn(
              'flex items-center font-medium h-10 rounded-2xl px-5',
              index === activeIndex && 'bg-white shadow-md shadow-gray-200 text-primary'
            )}
            key={index}
          >
            <button>
              {category.name}
            </button>
          </Link>

          // <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        ))
      }
    </div>
  );
};
