import React from 'react';

import Hero from '../../components/hero/hero.component.jsx';
import Cta from '../../components/cta/cta.component.jsx';
import Newsletter from '../../components/newsletter/newsletter.component.jsx';
import NewProducts from '../../components/new-products/new-products.component.jsx';
import TopProducts from '../../components/top-products/top-products.component.jsx';
import SectionHeadline from '../../components/section-headline/section-headline.component.jsx';
import ChooseCategory from '../../components/choose-category/choose-category.component.jsx';

const Home = () => {
  return (
    <>
      <div className='lg:relative'>
        <Hero />
      </div>
      <NewProducts />
      <Cta />
      <TopProducts />
      <div className='bg-white'>
        <div className='mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24'>
          <div className='space-y-12'>
            <div className='space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none'>
              <SectionHeadline
                tag={'#category'}
                headline={'Quelle catégorie vous convient?'}
              ></SectionHeadline>
            </div>
            <ul className='space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-2 lg:gap-x-8'>
              <ChooseCategory
                public_id='keke-cook/category-cake'
                category='Cakes'
              />
              <ChooseCategory
                public_id='keke-cook/category-sweet-table'
                category='Sweet Tables'
              />
            </ul>
          </div>
        </div>
      </div>
      <Newsletter />
    </>
  );
};

export default Home;
