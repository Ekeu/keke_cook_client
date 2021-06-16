import React, { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Select = ({ options, value, onChange, label, listBoxWrapperStyle }) => {
  return (
    <Listbox value={value} onChange={onChange} className={listBoxWrapperStyle}>
      {({ open }) => (
        <>
          <Listbox.Label className='block text-sm text-left font-medium font-hind text-blue-gray-800'>
            {label}
          </Listbox.Label>
          <div className='mt-1 relative'>
            <Listbox.Button className='relative font-hind w-full bg-white border border-blue-gray-300 rounded-md shadow-sm pl-5 pr-10 py-3 text-left cursor-pointer focus:outline-none sm:text-sm'>
              <span className='block truncate'>{value?.name}</span>
              <span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
                <SelectorIcon
                  className='h-5 w-5 text-blue-gray-400'
                  aria-hidden='true'
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Listbox.Options
                static
                className='absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base text-left font-hind ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'
              >
                {options?.map((option) => (
                  <Listbox.Option
                    key={option.name}
                    className={({ active }) =>
                      classNames(
                        active
                          ? 'text-white bg-rose-600'
                          : 'text-blue-gray-800',
                        'cursor-default select-none relative py-2 pl-8 pr-4'
                      )
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? 'font-semibold' : 'font-normal',
                            'block truncate'
                          )}
                        >
                          {option.name}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-rose-600',
                              'absolute inset-y-0 left-0 flex items-center pl-1.5'
                            )}
                          >
                            <CheckIcon className='h-5 w-5' aria-hidden='true' />
                          </span>
                        ) : null}
                      </>
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

export default Select;
