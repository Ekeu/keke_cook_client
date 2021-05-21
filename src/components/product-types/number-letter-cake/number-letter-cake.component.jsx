import React from 'react';
import MultiSelect from 'react-multi-select-component';
import { PlusCircleIcon, MinusCircleIcon } from '@heroicons/react/solid';

import FormInput from '../../form-input/form-input.component.jsx';
import Select from '../../select/select.component';

const NumberLetterCake = ({
  numberLetterCakeSharesList,
  numberLetterCakeSharesOptions,
  handleSelectedNumberLetterCakeShare,
  handleInputPriceShare,
  handleRemoveShare,
  handleAddShare,
  register,
  errors,
  overrideStrings,
  ArrowRenderer,
  ClearIcon,
  ClearSelectedIcon,
  numberLetterCakeBiscuitTypeOptions,
  selectedNumberLetterCakeBiscuitType,
  setSelectedNumberLetterCakeBiscuitType,
  numberLetterCakeCreamOptions,
  selectedNumberLetterCakeCreamType,
  setSelectedNumberLetterCakeCreamType,
  numberLetterCakeToppingsOptions,
  selectedNumberLetterCakeToppingType,
  setSelectedNumberLetterCakeToppingType,
}) => {
  return (
    <>
      <div className='grid grid-cols-6 gap-6'>
        <div className='col-span-6'>
          <label className='block text-sm font-medium text-blue-gray-700 font-hind'>
            Parts et prix du Number/Letter Cake
          </label>
        </div>
        {numberLetterCakeSharesList.map((numberLetterCakeShare, index) => {
          return (
            <React.Fragment key={numberLetterCakeShare.share._id}>
              <div className='col-span-3 sm:col-span-2'>
                <Select
                  options={numberLetterCakeSharesOptions}
                  value={numberLetterCakeShare.share}
                  onChange={(data) =>
                    handleSelectedNumberLetterCakeShare(data, index)
                  }
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
                value={numberLetterCakeShare.price}
                formInputWrapperClass='col-span-3 sm:col-span-2'
                autoComplete='off'
                handleChange={(e) => handleInputPriceShare(e, index)}
                placeholder='16'
              />

              {numberLetterCakeSharesList.length !== 1 && (
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
              {numberLetterCakeSharesList.length - 1 === index && (
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
        <FormInput
          id='numberOfNumbersOrLetters'
          name='numberOfNumbersOrLetters'
          type='number'
          label='numberOfNumbersOrLetters'
          labelText='Nombres de Lettres ou Chiffres'
          register={register('numberOfNumbersOrLetters', {
            required: 'Entrez le nombre de lettre ou de chiffres',
            max: {
              value: 2,
              message: 'Le nombre ne doit pas être supérieur à 2',
            },
            min: {
              value: 1,
              message: 'Le nombre ne doit pas être inférieur à 1',
            },
          })}
          formInputWrapperClass='col-span-6 sm:col-span-3 border-t-2 border-blue-gray-200 pt-4'
          autoComplete='off'
          placeholder='1'
          error={errors.numberOfNumbersOrLetters?.message}
        />
        <div className='col-span-6 sm:col-span-3  border-t-2 border-blue-gray-200 pt-4'>
          <label className='mb-1 block text-sm font-medium text-blue-gray-700 font-hind'>
            Biscuits(s)
          </label>
          <MultiSelect
            options={numberLetterCakeBiscuitTypeOptions}
            value={selectedNumberLetterCakeBiscuitType}
            overrideStrings={overrideStrings}
            onChange={setSelectedNumberLetterCakeBiscuitType}
            ArrowRenderer={ArrowRenderer}
            ClearIcon={ClearIcon}
            ClearSelectedIcon={ClearSelectedIcon}
            labelledBy='Biscuits'
            className='text-sm font-hind'
          />
        </div>
        <div className='col-span-6 sm:col-span-3'>
          <label className='mb-1 block text-sm font-medium text-blue-gray-700 font-hind'>
            Crême(s)
          </label>
          <MultiSelect
            options={numberLetterCakeCreamOptions}
            value={selectedNumberLetterCakeCreamType}
            overrideStrings={overrideStrings}
            onChange={setSelectedNumberLetterCakeCreamType}
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
            options={numberLetterCakeToppingsOptions}
            value={selectedNumberLetterCakeToppingType}
            overrideStrings={overrideStrings}
            onChange={setSelectedNumberLetterCakeToppingType}
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

export default NumberLetterCake;
