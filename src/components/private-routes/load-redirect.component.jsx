import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Modal from '../modal/modal.component';
import Loader from '../loader/loader.component';

const LoadRedirect = () => {
  const [countDown, setCountDown] = useState(5);
  const [openLoad, setOpenLoad] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown((currentCountDown) => --currentCountDown);
    }, 2000);
    setOpenLoad(true);
    if (countDown === 0) {
      history.push('/');
    }
    return () => {
      setOpenLoad(false);
      clearInterval(interval);
    };
  }, [countDown, history]);
  return (
    <Modal
      open={openLoad}
      backgroundColor={'bg-blue-gray-500'}
      backgroundOpacity={'bg-opacity-60'}
      onClose={() => {}}
    >
      <div>
        <div className='mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-rose-50'>
          <Loader />
        </div>
        <div className='mt-3 text-center sm:mt-5'>
          <h3 className='text-lg leading-6 font-medium text-blue-gray-800'>
            Vous allez être redirigé automatiquement
          </h3>
          <div className='mt-2 prose prose-indigo prose-lg'>
            <blockquote className='text-sm text-blue-gray-500'>
              Nul n'est heureux que le gourmand
            </blockquote>
          </div>
        </div>
      </div>
      <div className='mt-5 sm:mt-6'>
        <button
          type='button'
          className='inline-flex justify-center w-full border-0 border-transparent rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white cursor-text'
        >
          😋😊😉
        </button>
      </div>
    </Modal>
  );
};

export default LoadRedirect;
