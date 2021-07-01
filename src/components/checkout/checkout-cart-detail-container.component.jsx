import React from 'react';

const CheckoutCartDetailContainer = ({
  containerStyles,
  headline,
  children,
}) => {
  return (
    <div
      className={`bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6 ${containerStyles}`}
    >
      <h2
        id='timeline-title'
        className='text-lg font-bold uppercase font-hind text-blue-gray-800'
      >
        {headline}
      </h2>
      <div className={`flow-root`}>
        <div className='-mb-8'>
          <div className='relative pb-8 space-y-3'>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutCartDetailContainer;
