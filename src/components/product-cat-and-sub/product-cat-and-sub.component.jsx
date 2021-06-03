import React from 'react';
import Badge from '../badge/badge.component';

const ProductCatSub = ({ category, subcategories }) => {
  return (
    <div className='mt-6 border-t border-blue-gray-200 py-6 space-y-6'>
      <div>
        <h2 className='text-sm font-medium text-blue-gray-500 uppercase font-hind tracking-tight'>
          Catégorie
        </h2>
        <div className='mt-2 leading-8'>
          <span className='inline'>
            <Badge
              url={`/categories/${category?.slug}`}
              color='bg-violet-600'
              name={category?.name}
            />{' '}
          </span>
        </div>
      </div>
      <div>
        <h2 className='text-sm font-medium text-blue-gray-500 uppercase font-hind tracking-tight'>
          Sous Catégories
        </h2>
        <ul className='mt-2 leading-8'>
          {subcategories?.map((sc) => (
            <li className='inline' key={sc._id}>
              <Badge
                url={`/scategories/${sc?.slug}`}
                color='bg-rose-500'
                name={sc?.name}
              />{' '}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductCatSub;
