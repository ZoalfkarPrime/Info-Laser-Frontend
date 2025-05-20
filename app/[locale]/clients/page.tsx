import {Container} from "@/components/shared/Container";
import {getTranslations} from "next-intl/server";

export async function generateMetadata({params: paramsPromise}: { params: Promise<{ locale: string }> }) {
  const {locale} = await paramsPromise;
  const t = await getTranslations({locale});

  return {
    title: `${t('clientsMetaTitle')}`,
    description: `${t('clientsMetaDescription')}`,
  };
}

const ClientPage = () => {

  return (
    <section>
      <Container className="py-5">
        Страница клиентов
      </Container>
    </section>

  );
};

export default ClientPage;
