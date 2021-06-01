import React from 'react';
import MultiSelect from 'react-multi-select-component';

const BrowniePage = ({
  brownieToppings,
  brownieSelectedToppings,
  setBrownieSelectedToppings,
  overrideStrings,
  ArrowRenderer,
  ClearIcon,
  ClearSelectedIcon,
}) => {
  return (
    <>
      <div className='grid grid-cols-12 gap-x-10 gap-y-8 pt-8'>
        <div className='col-span-6'>
          <label className='mb-1 block text-sm font-medium text-blue-gray-700 font-hind'>
            Toppings
          </label>
          <MultiSelect
            options={brownieToppings}
            value={brownieSelectedToppings}
            overrideStrings={overrideStrings}
            onChange={setBrownieSelectedToppings}
            ArrowRenderer={ArrowRenderer}
            ClearIcon={ClearIcon}
            ClearSelectedIcon={ClearSelectedIcon}
            labelledBy='Toppings'
            className='text-sm font-hind'
          />
        </div>
      </div>
    </>
  );
};

export default BrowniePage;
