import {Container} from "@/components/shared/Container";
import {Button} from "@/components/ui/Button";
import Link from "next/link";

export default function MainPage() {
  return (

    <section className="my-5">
      <Container>

        <div className="flex gap-20 items-center">

          <Link href="/catalog">
            <Button className="">Каталог</Button>
          </Link>
        </div>

        Контент главной страницы
      </Container>
    </section>

  );
}
