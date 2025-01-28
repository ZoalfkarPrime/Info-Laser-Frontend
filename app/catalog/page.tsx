import {Container} from "@/components/shared/Container";
import {Categories} from "@/components/shared/Categories";

const CatalogPage = () => {
  return (
    <>
      <Container className="pt-5">

        <section>
          <h1 className="text-2xl font-semibold mb-3">Категории</h1>
          <Categories/>
        </section>

        <div className="mt-5">Ниже рандомный контент на странице каталога</div>

      </Container>
    </>
  );
};

export default CatalogPage;
