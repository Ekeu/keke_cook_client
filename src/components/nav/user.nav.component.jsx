import React from 'react';
import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
  GiftIcon,
  ClockIcon,
  MenuAlt2Icon,
  KeyIcon,
  XIcon,
} from '@heroicons/react/outline';
import { Link, useLocation } from 'react-router-dom';

import Logo from '../../assets/images/keke_cook_white_logo.svg';

const defaultNavigation = [
  { name: 'Historique', href: '/me/account', icon: ClockIcon },
  {
    name: 'Mot de passe',
    href: '/me/password/update',
    icon: KeyIcon,
  },
  {
    name: 'Liste de souhaits',
    href: '/me/wishlist',
    icon: GiftIcon,
  },
];

const defaultNavigationColors = {
  sideNavPrimaryBgColor: 'bg-rose-700',
  sideNavActiveLinkBgColor: 'bg-rose-800',
  sideNavActiveLinkTextColor: 'text-white',
  sideNavLinkTextColor: 'text-rose-100',
  sideNavLinkTextHoverColor: 'bg-rose-600',
  sideNavLinkIconColor: 'text-rose-300',
  sideMobileNavButtonBgColor: 'bg-rose-800',
  sideMobileNavButtonTextColor: ' text-rose-300',
  sideMobileNavButtonBorderColor: 'border-rose-200',
};

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const UserNav = ({
  children,
  navigation = defaultNavigation,
  navigationColors = defaultNavigationColors,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className='flex overflow-hidden bg-blue-gray-100'>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as='div'
          static
          className='fixed inset-0 flex z-40 md:hidden'
          open={sidebarOpen}
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter='transition-opacity ease-linear duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition-opacity ease-linear duration-300'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-gray-600 bg-opacity-75' />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter='transition ease-in-out duration-300 transform'
            enterFrom='-translate-x-full'
            enterTo='translate-x-0'
            leave='transition ease-in-out duration-300 transform'
            leaveFrom='translate-x-0'
            leaveTo='-translate-x-full'
          >
            <div
              className={`relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 ${navigationColors.sideNavPrimaryBgColor}`}
            >
              <Transition.Child
                as={Fragment}
                enter='ease-in-out duration-300'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='ease-in-out duration-300'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <div className='absolute top-0 right-0 -mr-12 pt-2'>
                  <button
                    type='button'
                    className='ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className='sr-only'>Close sidebar</span>
                    <XIcon className='h-6 w-6 text-white' aria-hidden='true' />
                  </button>
                </div>
              </Transition.Child>
              <div className='flex-shrink-0 flex items-center px-4'>
                <img className='h-9 w-auto' src={Logo} alt='Workflow' />
              </div>
              <div className='mt-5 flex-1 h-0 overflow-y-auto'>
                <nav className='px-2 space-y-1 font-hind'>
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={classNames(
                        location.pathname === item.href
                          ? `${navigationColors.sideNavActiveLinkBgColor} ${navigationColors.sideNavActiveLinkTextColor}`
                          : `${navigationColors.sideNavLinkTextColor} hover:${navigationColors.sideNavLinkTextHoverColor}`,
                        'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                      )}
                    >
                      <item.icon
                        className={`mr-4 h-6 w-6 ${navigationColors.sideNavLinkIconColor}`}
                        aria-hidden='true'
                      />
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </Transition.Child>
          <div className='flex-shrink-0 w-14' aria-hidden='true'>
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div
        className={`hidden ${navigationColors.sideNavPrimaryBgColor} md:flex md:flex-shrink-0`}
      >
        <div className='flex flex-col w-64'>
          <div className='flex flex-col flex-grow pt-5 pb-4 overflow-y-auto'>
            <div className='flex-1 flex flex-col'>
              <nav className='flex-1 px-2 space-y-1 font-hind'>
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={classNames(
                      location.pathname === item.href
                        ? `${navigationColors.sideNavActiveLinkBgColor} ${navigationColors.sideNavActiveLinkTextColor}`
                        : `${navigationColors.sideNavLinkTextColor} hover:${navigationColors.sideNavLinkTextHoverColor}`,
                      'group flex items-center px-6 py-2 text-sm font-medium rounded-md'
                    )}
                  >
                    <item.icon
                      className={`mr-3 h-6 w-6 ${navigationColors.sideNavLinkIconColor}`}
                      aria-hidden='true'
                    />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col md:flex-row w-0 flex-1 overflow-hidden'>
        <div className={`relative z-10 flex-shrink-0 flex h-16 ${navigationColors.sideMobileNavButtonBgColor} shadow`}>
          <button
            type='button'
            className={`px-4 border-r ${navigationColors.sideMobileNavButtonBorderColor} ${navigationColors.sideMobileNavButtonTextColor} focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rose-500 md:hidden`}
            onClick={() => setSidebarOpen(true)}
          >
            <span className='sr-only'>Open sidebar</span>
            <MenuAlt2Icon className='h-6 w-6' aria-hidden='true' />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default UserNav;
