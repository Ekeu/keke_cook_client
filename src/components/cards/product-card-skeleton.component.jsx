import React from 'react';

const ProductCardSkeleton = () => {
  return (
    <div className='space-y-4'>
      <div className='animate-pulse'>
        <div className='pb-5/6 relative bg-rose-100 rounded-lg shadow-md'></div>
        <div className='relative px-4 -mt-16'>
          <div className='bg-white p-6 rounded-lg shadow-lg'>
            <div className='flex-1 space-y-3 py-1'>
              <div className='space-y-1'>
                <div className='h-4 bg-rose-100 rounded w-2/12'></div>
                <div className='h-4 bg-rose-100 rounded w-5/6'></div>
              </div>
              <div className='space-y-2'>
                <div className='h-4 bg-rose-100 rounded w-2/3'></div>
                <div className='h-4 bg-rose-100 rounded w-2/3'></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
