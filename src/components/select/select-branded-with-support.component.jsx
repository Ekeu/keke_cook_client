import React, { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/solid';

import SpinSVG from '../spin-svg/spin-svg.component';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const SelectBrandedSupport = ({
  options,
  value,
  onChange,
  loading,
  listBoxWrapperStyle,
}) => {
  return (
    <Listbox value={value} onChange={onChange} className={listBoxWrapperStyle}>
      {({ open }) => (
        <>
          <Listbox.Label className='sr-only font-hind'>
            Change order status
          </Listbox.Label>
          <div className='relative'>
            <div className='flex justify-end rounded-md divide-x divide-rose-600'>
              <div className='relative z-0 inline-flex shadow-sm rounded-md divide-x divide-rose-600'>
                <div className='relative inline-flex items-center bg-rose-500 py-2 pl-3 pr-4 border border-transparent rounded-l-md shadow-sm text-white'>
                  {loading ? (
                    <SpinSVG size={'h-5 w-5'} color={'text-white'} />
                  ) : (
                    <CheckIcon className='h-5 w-5' aria-hidden='true' />
                  )}
                  <p className='ml-2.5 text-sm font-medium font-hind'>
                    {value.title}
                  </p>
                </div>
                <Listbox.Button className='relative inline-flex items-center bg-rose-500 p-2 rounded-l-none rounded-r-md text-sm font-medium font-hind text-white hover:bg-rose-600 focus:outline-none focus:z-10'>
                  <span className='sr-only'>Change order status</span>
                  <ChevronDownIcon
                    className='h-5 w-5 text-white'
                    aria-hidden='true'
                  />
                </Listbox.Button>
              </div>
            </div>

            <Transition
              show={open}
              as={Fragment}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Listbox.Options
                static
                className='origin-top-right absolute z-20 right-0 mt-2 w-72 rounded-md shadow-lg overflow-hidden bg-white divide-y divide-gray-200 ring-1 ring-blue-gray-800 ring-opacity-5 focus:outline-none font-hind'
              >
                {options.map((option) => (
                  <Listbox.Option
                    key={option.title}
                    className={({ active }) =>
                      classNames(
                        active
                          ? 'text-white bg-rose-500'
                          : 'text-blue-gray-800',
                        'cursor-pointer select-none relative p-4 text-sm'
                      )
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <div className='flex flex-col'>
                        <div className='flex justify-between'>
                          <p
                            className={
                              selected ? 'font-semibold' : 'font-normal'
                            }
                          >
                            {option.title}
                          </p>
                          {selected ? (
                            <span
                              className={
                                active ? 'text-white' : 'text-rose-500'
                              }
                            >
                              <CheckIcon
                                className='h-5 w-5'
                                aria-hidden='true'
                              />
                            </span>
                          ) : null}
                        </div>
                        <p
                          className={classNames(
                            active ? 'text-rose-200' : 'text-blue-gray-500',
                            'mt-2'
                          )}
                        >
                          {option.description}
                        </p>
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};

export default SelectBrandedSupport;
