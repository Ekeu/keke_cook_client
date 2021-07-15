import React from 'react';
import { TrashIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';

const WishlistProductCard = ({ product, onClick }) => {
  return (
    <div className='space-y-6'>
      <Link to={`/product/${product?.slug}`}>
        <img
          className='mx-auto h-40 w-40 rounded-full xl:w-56 xl:h-56 object-cover'
          src={product?.images[0]?.imageURL}
          alt={product?.title}
        />
      </Link>
      <div className='space-y-2'>
        <div className='text-lg leading-6 font-medium font-hind space-y-1'>
          <h3>{product?.title}</h3>
          <p className='text-rose-600 font-poppins'>{product?.price}</p>
        </div>
        <ul className='flex justify-center space-x-5'>
          <li>
            <span
              onClick={onClick}
              className='text-blue-gray-400 hover:text-blue-gray-500 cursor-pointer'
            >
              <span className='sr-only'>Supprimer</span>
              <TrashIcon className='w-5 h-5' />
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default WishlistProductCard;
