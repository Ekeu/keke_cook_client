import React from 'react';
import MultiSelect from 'react-multi-select-component';
import { PlusCircleIcon, MinusCircleIcon } from '@heroicons/react/solid';

import FormInput from '../../form-input/form-input.component.jsx';
import Select from '../../select/select.component';

const Macaron = ({
  macaronSharesList,
  macaronSharesOptions,
  handleSelectedMacaronShare,
  handleInputPriceShare,
  handleRemoveShare,
  handleAddShare,
  overrideStrings,
  ArrowRenderer,
  ClearIcon,
  ClearSelectedIcon,
  macaronShellColorOptions,
  selectedMacaronShellColorType,
  setSelectedMacaronShellColorType,
  macaronFodderOptions,
  selectedMacaronFodderType,
  setSelectedMacaronFodderType,
}) => {
  return (
    <>
      <div className='grid grid-cols-6 gap-6'>
        <div className='col-span-6'>
          <label className='block text-sm font-medium text-blue-gray-700 font-hind'>
            Parts et prix du Number/Letter Cake
          </label>
        </div>
        {macaronSharesList.map((macaronShare, index) => {
          return (
            <React.Fragment key={macaronShare.share._id}>
              <div className='col-span-2 sm:col-span-2'>
                <Select
                  options={macaronSharesOptions}
                  value={macaronShare.share}
                  onChange={(data) => handleSelectedMacaronShare(data, index)}
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
                value={macaronShare.price}
                formInputWrapperClass='col-span-2 sm:col-span-2'
                autoComplete='off'
                handleChange={(e) => handleInputPriceShare(e, index)}
                placeholder='16'
              />

              {macaronSharesList.length !== 1 && (
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
              {macaronSharesList.length - 1 === index && (
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
            Couleur(s) coque
          </label>
          <MultiSelect
            options={macaronShellColorOptions}
            value={selectedMacaronShellColorType}
            overrideStrings={overrideStrings}
            onChange={setSelectedMacaronShellColorType}
            ArrowRenderer={ArrowRenderer}
            ClearIcon={ClearIcon}
            ClearSelectedIcon={ClearSelectedIcon}
            labelledBy='Biscuits'
            className='text-sm font-hind'
          />
        </div>
        <div className='col-span-6 sm:col-span-3 border-t-2 border-blue-gray-200 pt-4'>
          <label className='mb-1 block text-sm font-medium text-blue-gray-700 font-hind'>
            Fourrage(s)
          </label>
          <MultiSelect
            options={macaronFodderOptions}
            value={selectedMacaronFodderType}
            overrideStrings={overrideStrings}
            onChange={setSelectedMacaronFodderType}
            ArrowRenderer={ArrowRenderer}
            ClearIcon={ClearIcon}
            ClearSelectedIcon={ClearSelectedIcon}
            labelledBy='Fourrages'
            className='text-sm font-hind'
          />
        </div>
      </div>
    </>
  );
};

export default Macaron;
