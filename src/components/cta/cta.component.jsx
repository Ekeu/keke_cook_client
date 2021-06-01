import React from 'react';
import { Image } from 'cloudinary-react';
import { SparklesIcon } from '@heroicons/react/outline';

import CustomLink from '../custom-link/custom-link.component.jsx';

const Cta = () => {
  return (
    <div className='mt-24'>
      <div className='lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24'>
        <div className='px-4 max-w-xl mx-auto sm:px-6 lg:py-32 lg:max-w-none lg:mx-0 lg:px-0 lg:col-start-2'>
          <div>
            <div>
              <span className='h-12 w-12 rounded-md flex items-center justify-center bg-rose-600'>
                <SparklesIcon
                  className='h-6 w-6 text-white'
                  aria-hidden='true'
                />
              </span>
            </div>
            <div className='mt-6'>
              <h2 className='text-3xl font-extrabold tracking-tight text-blue-gray-900 font-hind'>
                Des patisseries exceptionelles, pour des évènements exceptionelles
              </h2>
              <p className='mt-4 text-lg text-blue-gray-500 font-hind'>
                Semper curabitur ullamcorper posuere nunc sed. Ornare iaculis
                bibendum malesuada faucibus lacinia porttitor. Pulvinar laoreet
                sagittis viverra duis. In venenatis sem arcu pretium pharetra
                at. Lectus viverra dui tellus ornare pharetra.
              </p>
              <div className='mt-6'>
                <CustomLink
                url='/shop'
                type='link-button'
                custom='inlin-flex px-8 py-3 text-base font-medium text-white bg-rose-600 hover:bg-rose-700 md:py-4 md:text-lg md:px-10'
              >
                Acheter
              </CustomLink>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-12 sm:mt-16 lg:mt-0 lg:col-start-1'>
          <div className='pr-4 -ml-48 sm:pr-6 md:-ml-16 lg:px-0 lg:m-0 lg:relative lg:h-full'>
            <Image
              className='w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:right-0 lg:h-full lg:w-auto lg:max-w-none'
              cloudName='dmcookpro'
              publicId='keke-cook/macaroons-with-blueberries'
              loading='lazy'
              width='100%'
              height='100%'
            ></Image>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cta;
