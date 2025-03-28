import {CategoriesCatalog} from "@/components/shared/categories/CategoriesCatalog";
import {getCategories} from "@/api/api";
import {OfflineOrOnline} from "@/components/shared/OfflineOrOnline";
import {PartnersSlider} from "@/components/shared/carousels/PartnersSlider";

const CatalogPage = async () => {
  const categories = await getCategories();

  return (
    <>

      <CategoriesCatalog title={"Каталог"} categories={categories}/>

      <OfflineOrOnline/>

      <PartnersSlider/>

    </>

  );
};

export default CatalogPage;
