import {Container} from "@/components/shared/Container";
import {Button} from "@/components/ui/Button";
import {BannerMain} from "@/components/shared/banners/Banner-main";
import Link from "next/link";

export default function MainPage() {
  return (
    <>
      <section className="my-5">
        <h2 className="hidden">Основные акции и новости компании</h2>
        <BannerMain/>
      </section>

      <section className="my-5">
        <Container>
          <Link href="/catalog">
            <Button className="">Каталог</Button>
          </Link>
        </Container>
      </section>
    </>
  );
}
