import {CategoriesCatalog} from "@/components/shared/categories/CategoriesCatalog";
import {getCatalogData} from "@/api/api";
import {PartnersSlider} from "@/components/shared/carousels/PartnersSlider";
import {OfflineOrOnlineMain} from "@/components/shared/banners/OfflineOrOnlineMain";
import {getTranslations} from "next-intl/server";

export async function generateMetadata({params: paramsPromise}: { params: Promise<{ locale: string }> }) {
  const {locale} = await paramsPromise;
  const t = await getTranslations({locale});

  return {
    title: `${t('catalogMetaTitle')}`,
    description: `${t('catalogMetaDescription')}`,
  };
}

const CatalogPage = async () => {
  const {product, accessory} = await getCatalogData();

  return (
    <>
      <CategoriesCatalog
        title={"Каталог оборудования и комплектующих"}
        productCategories={product}
        accessoryCategories={accessory}
      />
      <OfflineOrOnlineMain/>
      <PartnersSlider/>
    </>
  );
};

export default CatalogPage;
