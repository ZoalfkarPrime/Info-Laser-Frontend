import {Container} from "@/components/shared/Container";
import {Categories} from "@/components/shared/Categories";
import {getCategories} from "@/lib/api";

const CatalogPage = async () => {
  const categories = await getCategories();

  return (
    <section>
      <Container className="pt-5">

        <h1 className="text-2xl font-semibold mb-3">Категории</h1>
        <Categories categories={categories}/>

        <div className="mt-5">Ниже рандомный контент на странице каталога</div>

      </Container>
    </section>

  );
};

export default CatalogPage;
