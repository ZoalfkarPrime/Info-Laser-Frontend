import React from 'react';
import { Container } from '@/components/shared/Container';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';

export const ServicesHero: React.FC = () => {
  return (
    <section className="relative overflow-hidden min-h-[568px] flex items-center py-20 max-md:py-10">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/img/adjustment/adjustment-header-bg.jpg" 
          alt="Service Hero Background" 
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-[#efeefa]/90 via-[#ecedfa]/80 via-[#dbe6fc]/70 to-[#dfd8fd]/60 z-1" />
      
      <Container className="relative z-10">
        <div className="grid grid-cols-12 gap-5 w-full">
          <div className="col-span-7 max-xl:col-span-full">
            <h1 className="text-[46px] font-semibold leading-[1.1] mb-8 max-md:text-3xl">
              Сервисное обслуживание
            </h1>
            <p className="text-sm text-gray-700 mb-10 max-w-[675px] leading-relaxed">
              Сервис нашей компании помогает клиентам уже почти 10 лет. За это время мы накопили много знаний и практического опыта работы с самыми различными моделями лазерного оборудования.
            </p>
            
            <div className="flex gap-2 max-w-[675px] mb-4 max-md:flex-col">
              <div className="relative flex-1">
                <Input 
                  placeholder="Найти" 
                  className="rounded-full h-[42px] border-gray-300 pl-4 pr-10 bg-white"
                />
              </div>
              <Button variant="violet" className="rounded-full h-[42px] px-10">
                Поиск
              </Button>
            </div>
            
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
              <span className="text-[#5c627c]">Популярные запросы:</span>
              <button className="text-[var(--violet)] hover:underline transition-all">Тестовый образец</button>
              <button className="text-[var(--violet)] hover:underline transition-all">Безопасность</button>
              <button className="text-[var(--violet)] hover:underline transition-all">Программное обеспечение</button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
