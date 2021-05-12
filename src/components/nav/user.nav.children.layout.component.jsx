import React from 'react';

const UserNavChildrenLayout = ({ headline, description, children }) => {
  return (
    <main className='flex-1 relative overflow-hidden focus:outline-none'>
      <div className='py-6'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 md:px-8'>
          <h1 className='text-2xl font-semibold text-blue-gray-800 font-poppins tracking-tighter'>
            {headline}
          </h1>
          <p className='mt-2 text-sm font-medium font-hind text-blue-gray-600'>
            {description}
          </p>
        </div>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 md:px-8'>{children}</div>
      </div>
    </main>
  );
};

export default UserNavChildrenLayout;
