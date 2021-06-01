import React from 'react';
import MultiSelect from 'react-multi-select-component';

import Select from '../../select/select.component';

import { currencyFormatter } from '../../../utils/functions';

const CupcakePage = ({
  cupcakeShares,
  cupcakeShare,
  setCupcakeShare,
  price,
  cupcakeCakes,
  cupcakeCake,
  cupcakeCake2,
  setCupcakeCake,
  setCupcakeCake2,
  cupcakeFodders,
  cupcakeFodder,
  cupcakeFodder2,
  setCupcakeFodder,
  setCupcakeFodder2,
  cupcakeCreamColors,
  cupcakeCreamColor,
  cupcakeCreamColor2,
  setCupcakeCreamColor,
  setCupcakeCreamColor2,
  cupcakeToppings,
  cupcakeToppings2,
  cupcakeSelectedToppings,
  cupcakeSelectedToppings2,
  setCupcakeSelectedToppings,
  setCupcakeSelectedToppings2,
  overrideStrings,
  ArrowRenderer,
  ClearIcon,
  ClearSelectedIcon,
  cupcakeDescription,
  cupcakeDescriptionOnChange,
}) => {
  return (
    <>
      <div className='grid grid-cols-12 gap-x-12 gap-y-8'>
        <div className='col-span-6'>
          <Select
            options={cupcakeShares}
            value={cupcakeShare}
            onChange={setCupcakeShare}
            label={'Nombre de Part'}
          />
        </div>
        <div className='col-span-6'>
          <div className='font-medium'>
            <span className='text-sm font-hind text-blue-gray-800'>Prix</span>
          </div>
          <div className='font-extrabold flex items-center'>
            <span className='text-3xl tracking-tight text-rose-500 font-poppins'>
              {currencyFormatter(price)}
            </span>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-12 gap-x-10 gap-y-8 pt-8'>
        <div className='col-span-6'>
          <Select
            options={cupcakeCakes}
            value={cupcakeCake}
            onChange={setCupcakeCake}
            label={'Saveur Cake'}
          />
        </div>
        <div className='col-span-6'>
          <Select
            options={cupcakeFodders}
            value={cupcakeFodder}
            onChange={setCupcakeFodder}
            label={'Fourrage'}
          />
        </div>
        <div className='col-span-6'>
          <Select
            options={cupcakeCreamColors}
            value={cupcakeCreamColor}
            onChange={setCupcakeCreamColor}
            label={'Couleur Crème'}
          />
        </div>
        <div className='col-span-6'>
          <label className='mb-1 block text-sm font-medium text-blue-gray-700 font-hind'>
            Toppings
          </label>
          <MultiSelect
            options={cupcakeToppings}
            value={cupcakeSelectedToppings}
            overrideStrings={overrideStrings}
            onChange={setCupcakeSelectedToppings}
            ArrowRenderer={ArrowRenderer}
            ClearIcon={ClearIcon}
            ClearSelectedIcon={ClearSelectedIcon}
            labelledBy='Toppings'
            className='text-sm font-hind'
          />
        </div>
      </div>
      <div className='grid grid-cols-12 gap-x-10 gap-y-8 pt-5 border-t-2 border-blue-gray-100 mt-6'>
        <div className='col-span-6'>
          <Select
            options={cupcakeCakes}
            value={cupcakeCake2}
            onChange={setCupcakeCake2}
            label={'Saveur Cake 2'}
          />
        </div>
        <div className='col-span-6'>
          <Select
            options={cupcakeFodders}
            value={cupcakeFodder2}
            onChange={setCupcakeFodder2}
            label={'Fourrage 2'}
          />
        </div>
        <div className='col-span-6'>
          <Select
            options={cupcakeCreamColors}
            value={cupcakeCreamColor2}
            onChange={setCupcakeCreamColor2}
            label={'Couleur Crème 2'}
          />
        </div>
        <div className='col-span-6'>
          <label className='mb-1 block text-sm font-medium text-blue-gray-700 font-hind'>
            Toppings 2
          </label>
          <MultiSelect
            options={cupcakeToppings2}
            value={cupcakeSelectedToppings2}
            overrideStrings={overrideStrings}
            onChange={setCupcakeSelectedToppings2}
            ArrowRenderer={ArrowRenderer}
            ClearIcon={ClearIcon}
            ClearSelectedIcon={ClearSelectedIcon}
            labelledBy='Toppings 2'
            className='text-sm font-hind'
          />
        </div>
      </div>
      <div className='grid grid-cols-12 gap-x-10 gap-y-8 pt-8'>
        <div className='col-span-12'>
          <label htmlFor='comment' className='sr-only'>
            Description
          </label>
          <textarea
            id='description'
            name='description'
            rows={3}
            value={cupcakeDescription}
            onChange={cupcakeDescriptionOnChange}
            className='shadow-sm block w-full focus:ring-rose-500 focus:border-rose-500 sm:text-sm border-blue-gray-300 rounded-md font-hind'
            placeholder='Ajouter une description (Thème, code couleur...etc)'
          />
        </div>
      </div>
    </>
  );
};

export default CupcakePage;
