import React from 'react';
import { PlusIcon } from '@heroicons/react/solid';

const AddAddressCard = ({onClick }) => {
  return (
    <div className='inline-block relative px-4 sm:px-0'>
      <div className='flex flex-col border border-blue-gray-200 hover:border-blue-gray-700 rounded-lg shadow-sm overflow-hidden h-full'>
        <div className='flex-1 bg-white p-6 flex flex-col justify-between'>
          <div className='flex-1'>
            <p className='text-lg font-hind text-blue-gray-800'>
              Nouvelle Adresse
            </p>
            <span className='block mt-2 text-blue-gray-200'>
              <p className='text-lg font-hind'>123 Rue Versailles Gautier</p>
              <p className='text-lg font-hind'>chez Jean François Le Maire</p>
              <p className='text-lg font-hind'>Versailles, 12340</p>
            </span>
          </div>
          <div className='mt-6 flex items-center'>
            <div className='space-y-2 mt-2'>
              <button
                type='button'
                onClick={onClick}
                className='inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-blue-gray-700 hover:bg-blue-gray-800 focus:outline-none cursor-pointer'
              >
                <PlusIcon
                  className='h-6 w-6 cursor-pointer'
                  aria-hidden='true'
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAddressCard;
