import React from 'react';

const OrderedProductInfo = ({ label, children }) => {
  return (
    <p className='mt-2 space-x-2 max-w-2xl text-sm text-blue-gray-500'>
      <span>{label}</span>
      {children}
    </p>
  );
};

export default OrderedProductInfo;
