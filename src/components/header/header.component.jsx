import React from 'react';
import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { MenuIcon, XIcon, ShoppingBagIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';

import Logo from '../../assets/images/keke_cook_logo.svg';

import {
  MENU_HEADER_LINKS,
  USER_HEADER_MENU_LINKS,
  SIGN_IN,
} from '../../constants/menu.constants';

import CustomLink from '../custom-link/custom-link.component.jsx';
import Search from '../search/search.component.jsx';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Header = () => {
  const currentUser = null;
  return (
    <Disclosure as='nav' className='bg-white shadow '>
      {({ open }) => (
        <>
          <>
            <div className='max-w-7xl mx-auto px-2 sm:px-4 lg:px-8'>
              <div className='flex justify-between h-16'>
                <div className='flex px-2 lg:px-0'>
                  <div className='flex-shrink-0 flex items-center'>
                    <Link to='/'>
                      <img
                        className='block lg:hidden h-9 w-auto'
                        src={Logo}
                        alt='Keke Cook'
                      />
                      <img
                        className='hidden lg:block h-9 w-auto'
                        src={Logo}
                        alt='Keke Cook'
                      />
                    </Link>
                  </div>
                  <div className='hidden lg:ml-6 lg:flex lg:space-x-8 c'>
                    {MENU_HEADER_LINKS.map((link) => {
                      const { id, text, url } = link;
                      return (
                        <CustomLink key={id} url={url} type='nav'>
                          {text}
                        </CustomLink>
                      );
                    })}
                  </div>
                </div>
                <Search />
                <div className='flex items-center lg:hidden'>
                  <Disclosure.Button className='inline-flex items-center justify-center p-2 rounded-md text-blue-gray-400 hover:text-blue-gray-500 hover:bg-blue-gray-100 focus:outline-none'>
                    <span className='sr-only'>Open main menu</span>
                    {open ? (
                      <XIcon className='block h-6 w-6' aria-hidden='true' />
                    ) : (
                      <MenuIcon className='block h-6 w-6' aria-hidden='true' />
                    )}
                  </Disclosure.Button>
                </div>
                <div className='hidden lg:ml-4 lg:flex lg:items-center'>
                  <button className='flex-shrink-0 bg-white p-1 text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                    <span className='sr-only'>View notifications</span>
                    <ShoppingBagIcon className='h-6 w-6' aria-hidden='true' />
                  </button>
                  {currentUser ? (
                    <Menu as='div' className='ml-4 relative flex-shrink-0'>
                      {({ open }) => (
                        <>
                          <div>
                            <Menu.Button className='bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'>
                              <span className='sr-only'>Open user menu</span>
                              <img
                                className='h-8 w-8 rounded-full'
                                src={currentUser && currentUser.photoURL}
                                alt={currentUser && currentUser.displayName}
                              />
                            </Menu.Button>
                          </div>
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
                              className='z-20 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'
                            >
                              {USER_HEADER_MENU_LINKS.map((link) => {
                                const { id, text, url } = link;
                                return (
                                  <Menu.Item key={id}>
                                    {({ active }) => (
                                      <Link
                                        to={url}
                                        className={classNames(
                                          active ? 'bg-blue-gray-100' : '',
                                          'block capitalize px-4 py-2 text-sm text-blue-gray-700'
                                        )}
                                      >
                                        {text}
                                      </Link>
                                    )}
                                  </Menu.Item>
                                );
                              })}
                              <Menu.Item>
                                <CustomLink
                                  type='button'
                                  role='menuitem'
                                  onClick={() => {}}
                                >
                                  Sign out
                                </CustomLink>
                              </Menu.Item>
                            </Menu.Items>
                          </Transition>
                        </>
                      )}
                    </Menu>
                  ) : (
                    <CustomLink
                      to='/login'
                      type='link-button'
                      custom='ml-5 px-4 py-2  text-base font-medium text-white bg-rose-600 hover:bg-rose-700'
                    >
                      {SIGN_IN}
                    </CustomLink>
                  )}
                </div>
              </div>
            </div>
          </>
        </>
      )}
    </Disclosure>
  );
};

export default Header;