import React from 'react';
import { SearchIcon } from '@heroicons/react/solid';

const Search = () => {
  return (
    <div className='flex-1 flex items-center justify-center px-2 lg:ml-6 lg:justify-end'>
      <div className='max-w-lg w-full lg:max-w-xs'>
        <label htmlFor='search' className='sr-only'>
          Search
        </label>
        <div className='relative'>
          <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
            <SearchIcon className='h-5 w-5 text-blue-gray-400' />
          </div>
          <input
            id='search'
            name='search'
            className='block w-full pl-10 pr-3 py-2 border border-blue-gray-300 rounded-md leading-5 bg-white placeholder-blue-gray-500 focus:outline-none focus:placeholder-blue-gray-400 focus:ring-1 focus:ring-red-500 focus:border-red-500 sm:text-sm font-hind'
            placeholder='Search'
            type='search'
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
