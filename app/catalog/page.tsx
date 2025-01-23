import {Container} from "@/components/shared/container";
import {Categories} from "@/components/shared/categories";
import {Title} from "@/components/shared/title";

const Catalog = () => {
  return (
    <>
      <Container className="pt-5">

        <Title className="font-semibold mb-3" size={"lg"} text={'Категории'}/>

        <Categories/>

        <div className="mt-5">Ниже рандомный контент на странице каталога</div>

      </Container>
    </>
  );
};

export default Catalog;
