import React from 'react';

import { Image } from 'cloudinary-react';

const ChooseCategory = ({ public_id, category }) => {
  return (
    <li>
      <div className='space-y-4'>
        <div className='aspect-w-3 aspect-h-2'>
          <Image
            className='object-cover shadow-lg rounded-lg'
            cloudName='dmcookpro'
            publicId={public_id}
            loading='lazy'
            width='100%'
            height='100%'
          ></Image>
        </div>

        <div className='space-y-2'>
          <div className='text-lg text-center leading-6 font-medium space-y-1'>
            <h3 className='font-hind text-2xl uppercase tracking-widest text-blue-gray-800'>
              {category}
            </h3>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ChooseCategory;
