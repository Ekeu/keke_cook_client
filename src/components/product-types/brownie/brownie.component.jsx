import React from 'react';
import MultiSelect from 'react-multi-select-component';

const Brownie = ({
  overrideStrings,
  ArrowRenderer,
  ClearIcon,
  ClearSelectedIcon,
  brownieToppingsOptions,
  selectedBrownieToppingType,
  setSelectedBrownieToppingType,
}) => {
  return (
    <>
      <div className='grid grid-cols-6 gap-6'>
        <div className='col-span-6 sm:col-span-3'>
          <label className='mb-1 block text-sm font-medium text-blue-gray-700 font-hind'>
            Topping(s)
          </label>
          <MultiSelect
            options={brownieToppingsOptions}
            value={selectedBrownieToppingType}
            overrideStrings={overrideStrings}
            onChange={setSelectedBrownieToppingType}
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

export default Brownie;
