import {Container} from "@/components/shared/container";
import {Title} from "@/components/shared/title";
import {Categories} from "@/components/shared/categories";
import {SortPopup} from "@/components/shared/sort-popup";
import {Filters} from "@/components/shared/filters";

const Category = () => {
  return (
    <>
      <Container className="pt-5">
        <Title className="font-semibold mb-3" size={"lg"} text={'Категории'}/>
        <div className="flex items-center justify-between">
          <Categories/>
          <SortPopup/>
        </div>
      </Container>

      <Container className="mt-10">
        <div className="flex gap-14">

          {/* Фильтрация */}
          <div className="w-[250px] shadow-md shadow-black/30 p-5 rounded-xl">
            <Filters/>
          </div>

          {/* Контент */}
          <div className="">
            Тут будет список товаров + контент..
          </div>

        </div>
      </Container>
    </>
  );
};

export default Category;