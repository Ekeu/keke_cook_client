import React from 'react';

import { Image } from 'cloudinary-react';

import {
  CATEGORY_DESCRIPTION,
  CATEGORY_SVG_PATTERN,
} from '../../constants/category-page.constants';

const CatSubHero = ({ data, sub, currentSubcategory }) => {
  return (
    <div className='bg-gray-50'>
      <div className='relative overflow-hidden'>
        <div className='absolute inset-y-0 h-full w-full' aria-hidden='true'>
          <div className='relative h-full'>{CATEGORY_SVG_PATTERN}</div>
        </div>
        <div className='relative pt-6 pb-16 sm:pb-24'>
          <div className='mt-16 mx-auto max-w-7xl px-4 sm:mt-24 sm:px-6'>
            <div className='text-center'>
              <h1 className='text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl'>
                <span className='block font-hind text-violet-600'>
                  {data?.category}
                </span>
                <span className='block text-blue-gray-800 font-hind sm:text-4xl md:text-5xl'>
                  {data?.subcategories?.map((subcategory, idx) => {
                    if (idx >= data?.subcategories?.length - 1) {
                      if (sub) {
                        if (subcategory?.name === currentSubcategory) {
                          return (
                            <>
                              {' '}
                              <span className='text-rose-600'>{subcategory?.name}</span>
                            </>
                          );
                        }
                        return ' ' + subcategory?.name;
                      } else {
                        return ' ' + subcategory?.name;
                      }
                    }
                    if (sub) {
                      if (subcategory?.name === currentSubcategory) {
                        return (
                          <>
                            <span className='text-rose-600'>{subcategory?.name}</span>
                            {' | '}
                          </>
                        );
                      }
                      return subcategory?.name + ' | ';
                    } else {
                      return subcategory?.name + ' | ';
                    }
                  })}
                </span>
              </h1>
              <p className='mt-3 max-w-md mx-auto text-base font-hind text-blue-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl'>
                {CATEGORY_DESCRIPTION}
              </p>
            </div>
          </div>
        </div>

        <div className='relative'>
          <div className='absolute inset-0 flex flex-col' aria-hidden='true'>
            <div className='flex-1' />
            <div className='flex-1 w-full bg-gray-800' />
          </div>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 flex justify-center'>
            <Image
              className='relative rounded-lg shadow-lg'
              cloudName='dmcookpro'
              publicId={
                data?.category === 'Sweet Tables'
                  ? 'keke-cook/category-sweet-table'
                  : 'keke-cook/category-cake'
              }
              loading='lazy'
            ></Image>
          </div>
        </div>
      </div>
      <div className='bg-blue-gray-800'>
        <div className='max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8'>
          <h2 className='text-center text-gray-400 font-hind text-sm font-semibold uppercase tracking-wide'>
            La qualité dans toute sa simplicité
          </h2>
        </div>
      </div>
    </div>
  );
};

export default CatSubHero;
