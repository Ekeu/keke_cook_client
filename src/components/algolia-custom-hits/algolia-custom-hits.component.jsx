import React from 'react';
import { connectHits } from 'react-instantsearch-dom';
import ProductCard from '../cards/product-card.component.jsx';

import { EMPTY_QUERY_RESULTS } from '../../constants/products.page.constants';

const Hits = ({ hits }) => {
  return (
    <>
      {hits.length ? (
        <div className='mt-4 mx-auto max-w-md px-4 grid gap-8 sm:max-w-lg sm:px-6 lg:px-8 lg:grid-cols-3 lg:max-w-7xl'>
          {hits.map((product) => (
            <ProductCard product={product} key={product?.title} ap={true} />
          ))}
        </div>
      ) : (
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='max-w-3xl mx-auto py-10 xl:py-24 text-center'>
            {EMPTY_QUERY_RESULTS}
            <h3 className='my-6 text-2xl font-medium font-hind text-blue-gray-800'>
              Il n’y a pas de résultats pour votre requête
            </h3>
            <p className='text-blue-gray-600 font-hind'>
              Essayez une autre requête.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

const AlgoliaCustomHits = connectHits(Hits);

export default AlgoliaCustomHits;
