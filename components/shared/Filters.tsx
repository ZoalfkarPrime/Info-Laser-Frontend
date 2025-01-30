import React from 'react';
import {cn} from '@/lib/utils';
import {Input} from '@/components/ui/Input';
import {RangeSlider} from '@/components/ui/Range-slider';
import {FiltersGroup} from "@/components/shared/Filters-group";

export const Filters: React.FC = () => {

  const materials = [
    {name: 'Бумага', value: '1'},
    {name: 'Мех', value: '2'},
    {name: 'Дерево', value: '3'},
    {name: 'Картон', value: '4'},
    {name: 'Камень', value: '5'},
    {name: 'Кожа', value: '6'},
    {name: 'Пластик', value: '7'},
    {name: 'Резина', value: '8'}
  ];

  const manufacturer = [
    {name: 'Wattsan', value: '1'},
    {name: 'Rabbit 15', value: '2'},
    {name: 'Zerder', value: '3'}
  ];

  return (
    <form className={cn('w-[250px] shadow-md p-5 rounded-xl border border-gray-200')}>
      <h2 className="text-xl mb-5 font-semibold">Фильтрация</h2>

      <fieldset className="mb-3">
        <legend className="font-semibold mb-3">Цена от и до:</legend>
        <div className="flex gap-3 mb-5">
          <Input type="number" min={0} max={150000} placeholder="0" defaultValue={0}/>
          <Input type="number" min={100} max={150000} placeholder="150000"/>
        </div>
        <RangeSlider min={0} max={150000} step={10} value={[0, 150000]}/>
      </fieldset>

      <FiltersGroup title={'Материалы обработки'} items={materials} defaultOpen={true}/>

      <FiltersGroup title={'Производитель'} items={manufacturer}/>

    </form>
  );
};
