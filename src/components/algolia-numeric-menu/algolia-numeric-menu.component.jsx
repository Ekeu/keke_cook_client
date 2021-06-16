import React, { useState } from 'react';
import { connectNumericMenu } from 'react-instantsearch-dom';
import { RadioGroup } from '@headlessui/react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const NumericMenu = ({ items, refine }) => {
  const [selected, setSelected] = useState(items[0]);

  const onRadioChange = (item) => {
    setSelected(item);
    refine(item.value);
  };
  return (
    <RadioGroup value={selected} onChange={onRadioChange}>
      <div className='mt-1 bg-white rounded-md shadow-sm -space-y-px'>
        {items.map((item, itemIdx) => (
          <RadioGroup.Option
            key={item.value}
            value={item}
            className={({ checked }) =>
              classNames(
                itemIdx === 0 ? 'rounded-tl-md rounded-tr-md' : '',
                itemIdx === items.length - 1
                  ? 'rounded-bl-md rounded-br-md'
                  : '',
                checked
                  ? 'bg-violet-50 border-violet-200 z-10'
                  : 'border-blue-gray-200',
                'relative border p-4 flex cursor-pointer focus:outline-none'
              )
            }
          >
            {({ active, checked }) => (
              <>
                <span
                  className={classNames(
                    checked || item.isRefined
                      ? 'bg-violet-600 border-transparent'
                      : 'bg-white border-blue-gray-300',
                    active ? 'ring-2 ring-offset-2 ring-violet-500' : '',
                    'h-4 w-4 mt-0.5 cursor-pointer rounded-full border flex items-center justify-center'
                  )}
                  aria-hidden='true'
                >
                  <span className='rounded-full bg-white w-1.5 h-1.5' />
                </span>
                <div className='ml-3 flex flex-col'>
                  <RadioGroup.Label
                    as='span'
                    className={classNames(
                      checked || item.isRefined
                        ? 'text-violet-900'
                        : 'text-blue-gray-800',
                      'block text-sm font-medium'
                    )}
                  >
                    {item.label}
                  </RadioGroup.Label>
                </div>
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
};

const AlgoliaNumericMenu = connectNumericMenu(NumericMenu);

export default AlgoliaNumericMenu;
