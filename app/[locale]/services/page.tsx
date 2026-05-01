import React from 'react';
import { ServicesHero } from '@/components/shared/services/ServicesHero';
import { ServiceCompetence } from '@/components/shared/services/ServiceCompetence';
import { ArticlesOnMain } from '@/components/shared/articles/ArticlesOnMain';
import { SocialAndOnlineMini } from '@/components/shared/banners/SocialAndOnlineMini';

export async function generateMetadata({ params: paramsPromise }: { params: Promise<{ locale: string }> }) {
  await paramsPromise;
  return {
    title: 'Сервисное обслуживание - Info Laser',
    description: 'Сервис нашей компании помогает клиентам уже почти 10 лет. За это время мы накопили много знаний и практического опыта.',
  };
}

const ServicesPage = async () => {

  return (
    <div className="flex flex-col gap-0">
      <ServicesHero />
      <ServiceCompetence />
      <ArticlesOnMain />
      <SocialAndOnlineMini className="mb-20" />
    </div>
  );
};

export default ServicesPage;
