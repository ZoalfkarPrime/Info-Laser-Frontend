import {Container} from "@/components/shared/Container";
import {getCatalogData} from "@/api/api";
import {getTranslations} from "next-intl/server";
import {cn} from "@/lib/utils";
import {AccessoriesSimpleList} from "@/components/shared/accessories/AccessoriesSimpleList";

export async function generateMetadata({params: paramsPromise}: { params: Promise<{ locale: string }> }) {
  const {locale} = await paramsPromise;
  const t = await getTranslations({locale});

  return {
    title: `${t('accessoriesMetaTitle')}`,
    description: `${t('accessoriesMetaDescription')}`,
  };
}

const AccessoriesPage = async () => {
  const {accessory} = await getCatalogData();

  return (
    <section>
      <Container>
        <h1 className={cn(
          "text-4xl font-semibold mb-15",
          "max-xl:text-3xl max-xl:mb-10",
          "max-md:text-2xl max-md:mb-7",
        )}>
          Комплектующие
        </h1>

        <AccessoriesSimpleList accessoryCategories={accessory}/>

      </Container>
    </section>
  );
};

export default AccessoriesPage;