import React from 'react';
import MultiSelect from 'react-multi-select-component';

import Select from '../../select/select.component';
import FormInput from '../../form-input/form-input.component.jsx';

import { currencyFormatter } from '../../../utils/functions';

const NumberLetterCakePage = ({
  numberLetterCakeShares,
  numberLetterCakeShare,
  setNumberLetterCakeShare,
  numberLetterCakeBiscuits,
  numberLetterCakeBiscuit,
  numberLetterCakeBiscuit2,
  setNumberLetterCakeBiscuit,
  setNumberLetterCakeBiscuit2,
  numberLetterCakeCreams,
  numberLetterCakeCream,
  numberLetterCakeCream2,
  setNumberLetterCakeCream,
  setNumberLetterCakeCream2,
  caracters,
  onCaractersChange,
  numberOfNumbersOrLetters,
  numberLetterCakeToppings,
  numberLetterCakeToppings2,
  numberLetterCakeSelectedToppings,
  numberLetterCakeSelectedToppings2,
  setNumberLetterCakeSelectedToppings,
  setNumberLetterCakeSelectedToppings2,
  price,
  numberOfFlavors,
  overrideStrings,
  ArrowRenderer,
  ClearIcon,
  ClearSelectedIcon,
}) => {
  return (
    <>
      <div className='grid grid-cols-12 gap-x-12 gap-y-8'>
        <div className='col-span-6'>
          <Select
            options={numberLetterCakeShares}
            value={numberLetterCakeShare}
            onChange={setNumberLetterCakeShare}
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
        <FormInput
          id='numberLetterCakeCaracters'
          name='numberLetterCakeCaracters'
          type='text'
          label='numberLetterCakeCaracters'
          labelText='Caractères'
          value={caracters}
          handleChange={onCaractersChange}
          minLength={numberOfNumbersOrLetters}
          maxLength={numberOfNumbersOrLetters}
          helpText='Entrer les chiffres ou lettres'
          formInputWrapperClass='col-span-12'
          inputStyles='uppercase tracking-widest'
          autoComplete='off'
          placeholder='EK'
        />
        <div className='col-span-3'>
          <Select
            options={numberLetterCakeBiscuits}
            value={numberLetterCakeBiscuit}
            onChange={setNumberLetterCakeBiscuit}
            label={'Biscuit'}
          />
        </div>
        <div className='col-span-4'>
          <Select
            options={numberLetterCakeCreams}
            value={numberLetterCakeCream}
            onChange={setNumberLetterCakeCream}
            label={'Crème'}
          />
        </div>
        <div className='col-span-5'>
          <label className='mb-1 block text-sm font-medium text-blue-gray-700 font-hind'>
            Toppings
          </label>
          <MultiSelect
            options={numberLetterCakeToppings}
            value={numberLetterCakeSelectedToppings}
            hasSelectAll={false}
            overrideStrings={overrideStrings}
            onChange={setNumberLetterCakeSelectedToppings}
            ArrowRenderer={ArrowRenderer}
            ClearIcon={ClearIcon}
            ClearSelectedIcon={ClearSelectedIcon}
            labelledBy='Toppings'
            className='text-sm font-hind'
          />
        </div>
      </div>
      {Number(numberOfFlavors) >= 2 && (
        <div className='grid grid-cols-12 gap-x-10 gap-y-8 pt-5 border-t-2 border-blue-gray-100 mt-6'>
          <div className='col-span-3'>
            <Select
              options={numberLetterCakeBiscuits}
              value={numberLetterCakeBiscuit2}
              onChange={setNumberLetterCakeBiscuit2}
              label={'Biscuit 2'}
            />
          </div>
          <div className='col-span-4'>
            <Select
              options={numberLetterCakeCreams}
              value={numberLetterCakeCream2}
              onChange={setNumberLetterCakeCream2}
              label={'Crème 2'}
            />
          </div>
          <div className='col-span-5'>
            <label className='mb-1 block text-sm font-medium text-blue-gray-700 font-hind'>
              Toppings 2
            </label>
            <MultiSelect
              options={numberLetterCakeToppings2}
              value={numberLetterCakeSelectedToppings2}
              hasSelectAll={false}
              overrideStrings={overrideStrings}
              onChange={setNumberLetterCakeSelectedToppings2}
              ArrowRenderer={ArrowRenderer}
              ClearIcon={ClearIcon}
              ClearSelectedIcon={ClearSelectedIcon}
              labelledBy='Toppings 2'
              className='text-sm font-hind'
            />
          </div>
        </div>
      )}
    </>
  );
};

export default NumberLetterCakePage;
