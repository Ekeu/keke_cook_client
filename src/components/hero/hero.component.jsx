import React from 'react';
import { Image } from 'cloudinary-react';

import CustomLink from '../custom-link/custom-link.component.jsx';

const Hero = () => {
  return (
    <>
      <div className='mx-auto max-w-7xl w-full pt-16 pb-20 text-center lg:py-48 lg:text-left'>
        <div className='px-4 lg:w-1/2 sm:px-8 xl:pr-16'>
          <h1 className='text-4xl tracking-tight font-extrabold font-poppins text-blue-gray-800 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl'>
            <span className='block xl:inline'>Les patisseries de</span>{' '}
            <span className='block text-rose-600 xl:inline'>Keke Cook</span>
          </h1>
          <p className='mt-3 max-w-md mx-auto text-lg text-blue-gray-500 font-hind sm:text-xl md:mt-5 md:max-w-3xl'>
            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
            lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
            fugiat aliqua.
          </p>
          <div className='mt-10 sm:flex sm:justify-center lg:justify-start'>
            <div className='rounded-md shadow'>
              <CustomLink
                url='/shop'
                type='link-button'
                custom='w-full flex px-8 py-3 text-base font-medium text-white bg-rose-600 hover:bg-rose-700 md:py-4 md:text-lg md:px-10'
              >
                Acheter
              </CustomLink>
            </div>
            <div className='mt-3 rounded-md shadow sm:mt-0 sm:ml-3'>
              <CustomLink
                url='/blog'
                type='link-button'
                custom='w-full flex px-8 py-3 text-base font-medium text-rose-600 bg-white hover:bg-blue-gray-50 md:py-4 md:text-lg md:px-10'
              >
                Recettes
              </CustomLink>
            </div>
          </div>
        </div>
      </div>
      <div className='relative w-full h-64 sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:h-full'>
        <Image
          className='absolute inset-0 w-full h-full object-cover'
          cloudName='dmcookpro'
          publicId='keke-cook/keke-cook-hero-image'
          loading='lazy'
          width='100%'
          height='100%'
        ></Image>
      </div>
    </>
  );
};

export default Hero;
