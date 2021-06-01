import React from 'react';
import { Link } from 'react-router-dom';

import Rating from '../rating/rating.component';

import NoImage from '../../assets/images/no-product-image.png';

const ProductCard = ({
  product: { slug, title, images, category, price, rating, numReviews },
}) => {
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
                {title}
              </h4>
            </Link>
            <div className='mt-1 font-poppins text-blue-gray-800'>{price}</div>
            <Rating value={rating} reviews={numReviews} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
