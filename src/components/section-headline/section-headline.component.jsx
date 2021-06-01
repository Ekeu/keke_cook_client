import React from 'react';

const SectionHeadline = ({ tag, headline, children }) => {
  return (
    <div className='text-center mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl'>
      <h2 className='text-base font-semibold tracking-wider text-rose-600 uppercase font-hind'>
        {tag}
      </h2>
      <p className='mt-2 text-3xl font-extrabold text-blue-gray-800 tracking-tight sm:text-4xl font-hind'>
        {headline}
      </p>
      <p className='mt-5 mx-auto max-w-prose text-xl text-blue-gray-500 font-hind'>
        {children}
      </p>
    </div>
  );
};

export default SectionHeadline;
