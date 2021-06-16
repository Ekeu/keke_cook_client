import React from 'react';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';

const SlideOver = ({
  open,
  setOpen,
  title,
  showStickyFooter,
  children,
  onModalClick,
  button,
  button2,
  unmount,
  afterLeave,
}) => {
  return (
    <Transition.Root
      show={open}
      as={Fragment}
      unmount={unmount}
      afterLeave={afterLeave}
    >
      <Dialog
        as='div'
        static
        className='fixed inset-0 overflow-hidden'
        open={open}
        onClose={setOpen}
      >
        <div className='absolute inset-0 overflow-hidden'>
          <Dialog.Overlay className='absolute inset-0 bg-blue-gray-500 bg-opacity-60' />

          <div className='fixed inset-y-0 right-0 pl-10 max-w-full flex'>
            <Transition.Child
              as={Fragment}
              unmount={unmount}
              enter='transform transition ease-in-out duration-500 sm:duration-700'
              enterFrom='translate-x-full'
              enterTo='translate-x-0'
              leave='transform transition ease-in-out duration-500 sm:duration-700'
              leaveFrom='translate-x-0'
              leaveTo='translate-x-full'
              afterLeave={afterLeave}
            >
              <div className='w-screen max-w-md'>
                <div
                  className='h-full divide-y divide-gray-200 flex flex-col bg-white shadow-xl'
                  onClick={onModalClick}
                >
                  <div className='min-h-0 flex-1 flex flex-col py-6 overflow-y-scroll'>
                    <div className='px-4 sm:px-6'>
                      <div className='flex items-start justify-between'>
                        <Dialog.Title className='text-lg font-medium text-blue-gray-800 font-hind'>
                          {title}
                        </Dialog.Title>
                        <div className='ml-3 h-7 flex items-center'>
                          <button
                            className='bg-white rounded-md text-blue-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500'
                            onClick={() => setOpen(false)}
                          >
                            <span className='sr-only'>Close panel</span>
                            <XIcon className='h-6 w-6' aria-hidden='true' />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className='mt-6 relative flex-1 px-4 sm:px-6'>
                      {/* Replace with your content */}
                      {children}
                      {/* /End replace */}
                    </div>
                  </div>
                  {showStickyFooter && (
                    <div className='px-4 py-4 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense'>
                      {button2}
                      {button}
                    </div>
                  )}
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default SlideOver;
