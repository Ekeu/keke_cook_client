import React from 'react';

import SpinSVG from '../spin-svg/spin-svg.component';

const LoaderV2 = ({size, color}) => {
  return (
    <div className='my-60 sm:mx-auto sm:w-full sm:max-w-md'>
      <div className='py-8 px-4 flex justify-center sm:px-10'>
        <SpinSVG size={size} color={color} />
      </div>
    </div>
  );
};

export default LoaderV2;
