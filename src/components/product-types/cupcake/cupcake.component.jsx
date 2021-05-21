import React from 'react';
import MultiSelect from 'react-multi-select-component';
import { PlusCircleIcon, MinusCircleIcon } from '@heroicons/react/solid';

import FormInput from '../../form-input/form-input.component.jsx';
import Select from '../../select/select.component';

const CupCake = ({
  cupcakeSharesOptions,
  handleSelectedCupcakeShare,
  handleInputPriceShare,
  cupCakeSharesList,
  handleRemoveShare,
  handleAddShare,
  cupcakeCakeTypeOptions,
  selectedCupcakeCakeType,
  setSelectedCupcakeCakeType,
  ArrowRenderer,
  ClearIcon,
  ClearSelectedIcon,
  overrideStrings,
  cupcakeFodderOptions,
  selectedCupcakeFodderType,
  setSelectedCupcakeFodderType,
  cupcakeToppingsOptions,
  selectedCupcakeToppingType,
  setSelectedCupcakeToppingType,
  cupcakeCreamColorOptions,
  selectedCupcakeCreamColorType,
  setSelectedCupcakeCreamColorType,
}) => {
  return (
    <>
      <div className='grid grid-cols-6 gap-6'>
        <div className='col-span-6'>
          <label className='block text-sm font-medium text-blue-gray-700 font-hind'>
            Parts et prix du Cupcake
          </label>
        </div>
        {cupCakeSharesList.map((cupcakeShare, index) => {
          return (
            <React.Fragment key={cupcakeShare.share._id}>
              <div className='col-span-2 sm:col-span-2'>
                <Select
                  options={cupcakeSharesOptions}
                  value={cupcakeShare.share}
                  onChange={(data) => handleSelectedCupcakeShare(data, index)}
                  label={'Part'}
                />
              </div>
              <FormInput
                id='price'
                name='price'
                type='number'
                label='price'
                labelText='Prix'
                min='1'
                value={cupcakeShare.price}
                formInputWrapperClass='col-span-2 sm:col-span-2'
                autoComplete='off'
                handleChange={(e) => handleInputPriceShare(e, index)}
                placeholder='18'
              />

              {cupCakeSharesList.length !== 1 && (
                <div className='col-span-1 sm:col-span-1 pt-7 w-max'>
                  <div className='flex justify-center'>
                    <MinusCircleIcon
                      className='h-10 w-10 text-rose-400 hover:text-rose-500 cursor-pointer'
                      onClick={() => handleRemoveShare(index)}
                      aria-hidden='true'
                    />
                  </div>
                </div>
              )}
              {cupCakeSharesList.length - 1 === index && (
                <div className='col-span-1 sm:col-span-1 pt-7 w-max'>
                  <div className='flex justify-center'>
                    <PlusCircleIcon
                      className='h-10 w-10 text-teal-400 hover:text-teal-500 cursor-pointer'
                      onClick={handleAddShare}
                      aria-hidden='true'
                    />
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
        <div className='col-span-6 sm:col-span-3 border-t-2 border-blue-gray-200 pt-4'>
          <label className='mb-1 block text-sm font-medium text-blue-gray-700 font-hind'>
            Cake(s)
          </label>
          <MultiSelect
            options={cupcakeCakeTypeOptions}
            value={selectedCupcakeCakeType}
            overrideStrings={overrideStrings}
            onChange={setSelectedCupcakeCakeType}
            ArrowRenderer={ArrowRenderer}
            ClearIcon={ClearIcon}
            ClearSelectedIcon={ClearSelectedIcon}
            labelledBy='Cakes'
            className='text-sm font-hind'
          />
        </div>
        <div className='col-span-6 sm:col-span-3 border-t-2 border-blue-gray-200 pt-4'>
          <label className='mb-1 block text-sm font-medium text-blue-gray-700 font-hind'>
            Fourrage(s)
          </label>
          <MultiSelect
            options={cupcakeFodderOptions}
            value={selectedCupcakeFodderType}
            overrideStrings={overrideStrings}
            onChange={setSelectedCupcakeFodderType}
            ArrowRenderer={ArrowRenderer}
            ClearIcon={ClearIcon}
            ClearSelectedIcon={ClearSelectedIcon}
            labelledBy='Fourages'
            className='text-sm font-hind'
          />
        </div>
        <div className='col-span-6 sm:col-span-3'>
          <label className='mb-1 block text-sm font-medium text-blue-gray-700 font-hind'>
            Crême(s)
          </label>
          <MultiSelect
            options={cupcakeCreamColorOptions}
            value={selectedCupcakeCreamColorType}
            overrideStrings={overrideStrings}
            onChange={setSelectedCupcakeCreamColorType}
            ArrowRenderer={ArrowRenderer}
            ClearIcon={ClearIcon}
            ClearSelectedIcon={ClearSelectedIcon}
            labelledBy='Crêmes'
            className='text-sm font-hind'
          />
        </div>
        <div className='col-span-6 sm:col-span-3'>
          <label className='mb-1 block text-sm font-medium text-blue-gray-700 font-hind'>
            Topping(s)
          </label>
          <MultiSelect
            options={cupcakeToppingsOptions}
            value={selectedCupcakeToppingType}
            overrideStrings={overrideStrings}
            onChange={setSelectedCupcakeToppingType}
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

export default CupCake;
