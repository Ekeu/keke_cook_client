import React from 'react';

const CheckoutCartDetailInfo = ({
  attribute,
  value,
  attributeStyles,
  valueStyles,
}) => {
  return (
    <div className='relative flex space-x-3'>
      <div className='min-w-0 flex-1 pt-1.5 flex justify-between space-x-4'>
        <div>
          <p
            className={`text-sm text-blue-gray-800 font-hind uppercase ${attributeStyles}`}
          >
            {attribute}
          </p>
        </div>
        <div
          className={`text-right text-sm whitespace-nowrap text-blue-gray-800 font-hind ${valueStyles}`}
        >
          {value}
        </div>
      </div>
    </div>
  );
};

export default CheckoutCartDetailInfo;
