import React from 'react';

import NoImage from '../../assets/images/no-product-image.png';

const ProductNoImage = () => {
  return (
    <div className='relative pt-64 pb-10 rounded-2xl shadow-xl overflow-hidden'>
      <img
        className='absolute inset-0 h-full w-full object-cover'
        src={NoImage}
        alt='Keke Cook'
      />
      <div className='relative px-8'>
        <blockquote className='mt-8'>
          <footer className='mt-4'>
            <p className='text-base font-semibold text-rose-100 font-hind'></p>
          </footer>
        </blockquote>
      </div>
    </div>
  );
};

export default ProductNoImage;
