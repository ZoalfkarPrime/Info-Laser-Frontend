import {BannerMain} from "@/components/shared/carousels/banners/BannerMain";
import {NewProductsSlider} from "@/components/shared/carousels/NewProductsSlider";
import {PartnersSlider} from "@/components/shared/carousels/PartnersSlider";
import {UniqMachinesSlider} from "@/components/shared/carousels/UniqMachinesSlider";
import {OfflineOrOnlineMain} from "@/components/shared/OfflineOrOnlineMain";
import {SimplerTabsMain} from "@/components/shared/SimplerTabsMain";
import {AboutMain} from "@/components/shared/about/AboutMain";
import {ArticlesOnMain} from "@/components/shared/articles/ArticlesOnMain";
import {getProducts} from "@/api/api";


export default async function MainPage() {
  const {products} = await getProducts();

  return (
    <>
      <BannerMain/>

      <NewProductsSlider products={products}/>

      <PartnersSlider/>

      <UniqMachinesSlider/>

      <OfflineOrOnlineMain/>

      <SimplerTabsMain/>

      <AboutMain/>

      <ArticlesOnMain/>
    </>
  );
}
