import {CategoriesCatalog} from "@/components/shared/categories/Categories-catalog";
import {getCategories} from "@/api/api";
import {OfflineOrOnline} from "@/components/shared/OfflineOrOnline";
import {PartnersSlider} from "@/components/shared/carousels/Partners-slider";

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
