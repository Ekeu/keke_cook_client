import React from 'react';

const CartItemLabelValue = ({ label, value, gridCol }) => {
  return (
    <div className={`${gridCol ? gridCol : 'sm:col-span-1'} font-hind`}>
      <dt className='text-sm font-medium text-blue-gray-500'>{label}</dt>
      <dd className='mt-1 text-sm text-blue-gray-900'>{value}</dd>
    </div>
  );
};

export default CartItemLabelValue;
