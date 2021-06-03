import React from 'react';
import { StarIcon } from '@heroicons/react/solid';
import StarRatings from 'react-star-ratings';

import { averageRating } from '../../utils/functions';

const ProductRating = ({ handleRatingModal, productId, ratings }) => {
  return (
    <section aria-labelledby='product-rating'>
      <div className='mt-4 flow-root'>
        <div className='-my-4 divide-y divide-gray-200'>
          <div className='flex items-center py-4 space-x-3'>
            <div className='min-w-0 flex-1'>
              <span>
                <StarRatings
                  name={productId}
                  numberOfStars={5}
                  starDimension='20px'
                  starSpacing='3px'
                  starHoverColor='#FDA4AF'
                  starEmptyColor='#94A3B8'
                  starRatedColor='#F43F5E'
                  rating={ratings?.length > 0 ? averageRating(ratings) : 0}
                  isSelectable={false}
                />
              </span>
              <p className='text-sm text-blue-gray-500 font-hind mt-1'>
                {ratings?.length > 0
                  ? `${ratings.length} avi(s)`
                  : "Ce produit n'a pas encore été noté."}
              </p>
            </div>
            <div className='flex-shrink-0'>
              <button
                type='button'
                onClick={handleRatingModal}
                className='inline-flex items-center px-3 py-0.5 rounded-full bg-rose-50 text-sm font-medium font-hind text-rose-700 hover:bg-rose-100 focus:outline-none'
              >
                <StarIcon
                  className='-ml-1 mr-0.5 h-5 w-5 text-rose-400'
                  aria-hidden='true'
                />
                <span>Notez ce produit</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductRating;
