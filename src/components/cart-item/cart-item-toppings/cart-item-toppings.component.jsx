import React from 'react';

import { SparklesIcon } from '@heroicons/react/outline';

const CartItemToppings = ({ toppings, label }) => {
  return (
    <div className='sm:col-span-2 font-hind'>
      <dt className='text-sm font-medium text-blue-gray-500'>{label}</dt>
      <dd className='mt-1 text-sm text-blue-gray-900'>
        <ul className='border border-blue-gray-200 rounded-md divide-y divide-blue-gray-200'>
          {toppings.map((topping) => (
            <li
              key={topping?._id}
              className='pl-3 pr-4 py-3 flex items-center justify-between text-sm'
            >
              <div className='w-0 flex-1 flex items-center'>
                <SparklesIcon
                  className='flex-shrink-0 h-5 w-5 text-blue-gray-400'
                  aria-hidden='true'
                />
                <span className='ml-2 flex-1 w-0 truncate'>
                  {topping?.name}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </dd>
    </div>
  );
};

export default CartItemToppings;
