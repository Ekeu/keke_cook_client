import React from 'react';
import { XIcon } from '@heroicons/react/solid';

import Loader from '../loader/loader.component';

const ProductImage = ({ imageURL, public_id, removeImage, loading }) => {
  return (
    <span className='inline-block relative'>
      <img
        className='h-16 w-16 rounded-md object-cover'
        src={imageURL}
        alt={public_id}
      />
      <span
        onClick={removeImage}
        className={`absolute top-0 right-0 h-4 w-4 transform -translate-y-1/2 translate-x-1/2 rounded-full ring-2 ring-white bg-rose-500 flex justify-center ${
          !loading && 'pt-1'
        } cursor-pointer`}
      >
        {loading ? (
          <Loader height='h-3' width='h-3' />
        ) : (
          <XIcon className='h-2 w-2 text-white' aria-hidden='true' />
        )}
      </span>
    </span>
  );
};

export default ProductImage;
