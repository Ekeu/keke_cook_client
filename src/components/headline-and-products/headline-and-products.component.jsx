import React from 'react';

import SectionHeadline from '../section-headline/section-headline.component.jsx';
import ProductCard from '../cards/product-card.component.jsx';
import Pagination from '../pagination/pagination.component.jsx';
import ProductCardSkeleton from '../cards/product-card-skeleton.component.jsx';

const HeadlineAndProducts = ({
  tag,
  headline,
  children,
  loading,
  products,
  pages,
  page,
  setPageNumber
}) => {
  return (
    <div className='relative bg-blue-gray-50 py-16 sm:py-24 lg:py-32'>
      <div className='relative pb-12'>
        <SectionHeadline tag={tag} headline={headline}>
          {children}
        </SectionHeadline>
        <div className='mt-12 mx-auto max-w-md px-4 grid gap-8 sm:max-w-lg sm:px-6 lg:px-8 lg:grid-cols-3 lg:max-w-7xl'>
          {loading
            ? [...Array(3)].map((_, i) => <ProductCardSkeleton key={i} />)
            : products?.map((product) => (
                <ProductCard product={product} key={product?._id} />
              ))}
        </div>
      </div>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='max-w-3xl mx-auto'>
          <Pagination pages={pages} page={page} setPageNumber={setPageNumber} />
        </div>
      </div>
    </div>
  );
};

export default HeadlineAndProducts;
