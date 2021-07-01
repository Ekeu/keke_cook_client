import React from 'react';

import { currencyFormatter } from '../../utils/functions';

const CheckoutProductCard = ({ product }) => {
  const { imageURL, title, price, quantity } = product;
  return (
    <div className='space-y-4 sm:grid sm:grid-cols-3 sm:items-start sm:gap-6 sm:space-y-0'>
      <div className='aspect-w-3 aspect-h-2 sm:aspect-w-3 sm:aspect-h-3'>
        <img
          className='object-cover shadow-lg rounded-lg'
          src={imageURL}
          alt={title}
        />
      </div>
      <div className='sm:col-span-2'>
        <div className='space-y-1'>
          <div className='text-md leading-6 font-medium font-hind space-y-1'>
            <h3>{title}</h3>
            <p className='text-blue-gray-800 font-bold'>{currencyFormatter(price)}</p>
          </div>
          <div className='text-md'>
            <p className='text-blue-gray-500 font-hind'>Quantité : {quantity}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutProductCard;
