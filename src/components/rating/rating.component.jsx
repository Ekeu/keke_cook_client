import React from 'react';
import StarRatings from 'react-star-ratings';

import { averageRating } from '../../utils/functions';

const Rating = ({ ratings, styles, inline, productId }) => {
  return (
    <div
      className={['mt-2 flex items-center', styles].join(' ')}
      style={inline}
    >
      <StarRatings
        name={productId}
        numberOfStars={5}
        starDimension='16px'
        starSpacing='3px'
        starHoverColor='#FDA4AF'
        starEmptyColor='#94A3B8'
        starRatedColor='#F43F5E'
        rating={ratings?.length > 0 ? averageRating(ratings) : 0}
        isSelectable={false}
      />
      <span className='ml-2 text-blue-gray-600 text-sm font-hind pt-2'>
        {' '}
        {`${ratings?.length > 0 ? ratings.length : 0} retour(s)`}
      </span>
    </div>
  );
};

export default Rating;
