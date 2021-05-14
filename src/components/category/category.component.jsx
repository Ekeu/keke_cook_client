import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { DotsVerticalIcon } from '@heroicons/react/solid';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Category = ({ category, menuDeleteOptionAction, menuUpdateOptionAction, bgColor }) => {
  return (
    <>
      <li
        key={category._id}
        className='relative col-span-1 flex shadow-sm rounded-md'
      >
        <div
          className={`${bgColor} flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md`}
        >
          {category.initials}
        </div>
        <div className='flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate'>
          <div className='flex-1 px-4 py-2 text-sm truncate'>
            <Link
              href='#'
              className='text-gray-900 font-medium hover:text-gray-600'
            >
              {category.name}
            </Link>
            <p className='text-gray-500'>
              {moment(category.updatedAt).format('L')}
            </p>
          </div>
          <Menu as='div' className='flex-shrink-0 pr-2'>
            {({ open }) => (
              <>
                <Menu.Button className='w-8 h-8 bg-white inline-flex items-center justify-center text-blue-gray-400 rounded-full hover:text-blue-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-600'>
                  <span className='sr-only'>Open options</span>
                  <DotsVerticalIcon className='w-5 h-5' aria-hidden='true' />
                </Menu.Button>
                <Transition
                  show={open}
                  as={Fragment}
                  enter='transition ease-out duration-100'
                  enterFrom='transform opacity-0 scale-95'
                  enterTo='transform opacity-100 scale-100'
                  leave='transition ease-in duration-75'
                  leaveFrom='transform opacity-100 scale-100'
                  leaveTo='transform opacity-0 scale-95'
                >
                  <Menu.Items
                    static
                    className='z-10 mx-3 origin-top-right absolute right-10 top-3 w-48 mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'
                  >
                    <div className='py-1'>
                        <Menu.Item>
                          {({ active }) => (
                            <span
                              onClick={menuUpdateOptionAction}
                              className={classNames(
                                active
                                  ? 'bg-blue-gray-100 text-blue-gray-800'
                                  : 'text-blue-gray-700',
                                'block px-4 py-2 text-sm cursor-pointer'
                              )}
                            >
                              Modifier
                            </span>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <span
                              onClick={menuDeleteOptionAction}
                              className={classNames(
                                active
                                  ? 'bg-blue-gray-100 text-blue-gray-800'
                                  : 'text-blue-gray-700',
                                'block px-4 py-2 text-sm cursor-pointer'
                              )}
                            >
                              Supprimer
                            </span>
                          )}
                        </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </>
            )}
          </Menu>
        </div>
      </li>
    </>
  );
};

export default Category;
