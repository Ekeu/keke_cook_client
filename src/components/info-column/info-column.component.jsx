import React from 'react';

const InfoColumn = ({ headline, children }) => {
  return (
    <div className='md:col-span-1'>
      <h3 className='text-lg font-medium leading-6 text-blue-gray-900'>
        {headline}
      </h3>
      <p className='mt-1 text-sm text-blue-gray-500'>{children}</p>
    </div>
  );
};

export default InfoColumn;
