import {Container} from "@/components/shared/Container";
import {Button} from "@/components/ui/Button";
import {BannerMain} from "@/components/shared/carousels/banners/Banner-main";
import Link from "next/link";
import {NewProductsSlider} from "@/components/shared/carousels/New-products-slider";
import {PartnersSlider} from "@/components/shared/carousels/Partners-slider";

export default function MainPage() {
  return (
    <>
      <BannerMain/>

      <Container>
        <Link href="/catalog">
          <Button className="">Каталог</Button>
        </Link>

        <PartnersSlider/>
      </Container>

      <NewProductsSlider/>
    </>
  );
}
