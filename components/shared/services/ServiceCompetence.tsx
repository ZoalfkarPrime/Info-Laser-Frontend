import React from 'react';
import { Container } from '@/components/shared/Container';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface CompetenceCardProps {
  title: string;
  image: string;
  className?: string;
  imageClassName?: string;
}

const CompetenceCard: React.FC<CompetenceCardProps> = ({ title, image, className, imageClassName }) => (
  <div className={cn(
    "relative bg-[#f8f9fd] rounded-[40px] h-[300px] overflow-hidden p-8 flex flex-col justify-start items-start group",
    className
  )}>
    <div className="relative z-10 max-w-[270px]">
      <h3 className="text-[22px] font-semibold leading-tight mb-6">{title}</h3>
      <Button variant="violet" className="rounded-full px-6 h-[42px]">Подробнее</Button>
    </div>
    <div className={cn("absolute inset-0 z-0", imageClassName)}>
      <Image 
        src={image} 
        alt={title} 
        fill 
        className="object-cover group-hover:scale-105 transition-transform duration-700" 
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#f8f9fd] via-[#f8f9fd]/60 to-transparent" />
    </div>
  </div>
);

export const ServiceCompetence: React.FC = () => {
  return (
    <section className="py-20 bg-white max-md:py-10">
      <Container>
        <h2 className="text-[40px] font-semibold text-center mb-15 max-md:text-2xl max-md:mb-8">
          Обращайтесь к нам, в нашу компетенцию входят
        </h2>
        
        <div className="grid grid-cols-4 gap-5 max-xl:grid-cols-2 max-md:grid-cols-1">
          {/* Row 1 */}
          <CompetenceCard 
            title="Диагностика электрики и механики станков" 
            image="/img/adjustment/adjustment-header-bg.jpg" 
            className="col-span-2"
          />
          <CompetenceCard 
            title="Пусконаладка оборудования" 
            image="/img/adjustment/adjustment-header-bg.jpg" 
            className="col-span-1 max-xl:col-span-1"
            imageClassName="opacity-60"
          />
          <CompetenceCard 
            title="Настройка ПО" 
            image="/img/adjustment/adjustment-header-bg.jpg" 
            className="col-span-1 max-xl:col-span-1"
            imageClassName="opacity-60"
          />
          
          {/* Row 2 */}
          <CompetenceCard 
            title="Ремонт оборудования и комплектующих" 
            image="/img/adjustment/adjustment-header-bg.jpg" 
            className="col-span-2"
          />
          <CompetenceCard 
            title="Замена расходных материалов" 
            image="/img/adjustment/adjustment-header-bg.jpg" 
            className="col-span-2"
          />
        </div>
      </Container>
    </section>
  );
};
