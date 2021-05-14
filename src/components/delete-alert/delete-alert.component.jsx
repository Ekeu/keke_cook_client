import React from 'react';
import { Dialog } from '@headlessui/react';
import { ExclamationIcon } from '@heroicons/react/outline';

import CustomButton from '../custom-button/custom-button.component.jsx';

const DeleteAlert = ({
  headline,
  children,
  deleteAction,
  cancel,
  cancelButtonRef,
}) => {
  return (
    <>
      <div className='sm:flex sm:items-start'>
        <div className='mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-rose-100 sm:mx-0 sm:h-10 sm:w-10'>
          <ExclamationIcon
            className='h-6 w-6 text-rose-600'
            aria-hidden='true'
          />
        </div>
        <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
          <Dialog.Title
            as='h3'
            className='text-lg leading-6 font-medium font-hind text-blue-gray-800'
          >
            {headline}
          </Dialog.Title>
          <div className='mt-2'>
            <p className='text-sm text-blue-gray-500 font-hind'>{children}</p>
          </div>
        </div>
      </div>
      <div className='mt-5 sm:mt-4 sm:flex sm:flex-row-reverse'>
        <CustomButton
          type='button'
          onClick={deleteAction}
          customStyles='border border-transparent text-white bg-rose-600 hover:bg-rose-700 sm:ml-3 sm:w-auto sm:text-sm'
        >
          Supprimer
        </CustomButton>
        <CustomButton
          type='button'
          onClick={cancel}
          ref={cancelButtonRef}
          customStyles='border border-blue-gray-400 text-blue-gray-700 bg-white hover:bg-blue-gray-50 mt-3 sm:mt-0 sm:w-auto sm:text-sm'
        >
          Annuler
        </CustomButton>
      </div>
    </>
  );
};

export default DeleteAlert;
