import React from 'react';
import { Link } from 'react-router-dom';

import { Highlight } from 'react-instantsearch-dom';

import Rating from '../rating/rating.component';

import NoImage from '../../assets/images/no-product-image.png';

const ProductCard = ({ product, ap }) => {
  const { slug, title, images, category, price, ratings } = product;
  return (
    <div className='space-y-4'>
      <div>
        <div className='pb-5/6 relative'>
          <Link to={`/product/${slug}`}>
            <img
              className='h-full w-full object-cover absolute rounded-lg shadow-md'
              src={images.length > 0 ? images[0]?.imageURL : NoImage}
              alt={title}
            />
          </Link>
        </div>
        <div className='relative px-4 -mt-16'>
          <div className='bg-white p-6 rounded-lg shadow-lg'>
            <div className='flex items-baseline'>
              <span className='inline-block bg-rose-200 text-rose-600 text-xs uppercase tracking-widest font-semibold px-2 rounded-sm'>
                {category?.name}
              </span>
            </div>
            <Link to={`/product/${slug}`}>
              <h4 className='mt-1 font-semibold font-hind text-blue-gray-800 text-lg leading-snug truncate'>
                {ap ? <Highlight attribute='title' hit={product} /> : title }
              </h4>
            </Link>
            <div className='mt-1 font-poppins text-blue-gray-800'>{price}</div>
            <Rating ratings={ratings} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
