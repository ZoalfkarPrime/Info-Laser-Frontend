import {CategoriesCatalog} from "@/components/shared/categories/CategoriesCatalog";
import {getCategories} from "@/api/api";
import {PartnersSlider} from "@/components/shared/carousels/PartnersSlider";
import {OfflineOrOnlineMain} from "@/components/shared/banners/OfflineOrOnlineMain";

const CatalogPage = async () => {
  const categories = await getCategories();

  return (
    <>

      <CategoriesCatalog title={"Каталог"} categories={categories}/>

      <OfflineOrOnlineMain/>

      <PartnersSlider/>

    </>

  );
};

export default CatalogPage;
