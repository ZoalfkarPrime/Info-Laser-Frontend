import {Container} from "@/components/shared/container";
import {Categories} from "@/components/shared/categories";

const Catalog = () => {
  return (
    <>
      <Container className="pt-5">

        <div>
          <h2 className="text-2xl font-semibold mb-3">Категории</h2>
          <Categories/>
        </div>
        
        <div className="mt-5">Ниже рандомный контент на странице каталога</div>

      </Container>
    </>
  );
};

export default Catalog;
