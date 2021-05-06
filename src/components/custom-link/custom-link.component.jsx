import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const CustomLink = ({ url, custom, children, type, ...otherProps }) => {
  let Component;
  const location = useLocation();
  if (type === 'button') {
    Component = (
      <button
        {...otherProps}
        className={`w-full text-left block px-4 py-2 ${
          custom ? custom : 'text-sm text-blue-gray-700 hover:bg-blue-gray-100'
        } font-hind focus:outline-none`}
      >
        {children}
      </button>
    );
  } else if (type === 'link-button') {
    Component = (
      <Link
        to={url}
        {...otherProps}
        className={`${custom} inline-flex items-center justify-center border border-transparent rounded-md shadow-sm font-hind`}
      >
        {children}
      </Link>
    );
  } else if (type === 'nav') {
    Component = (
      <Link
        to={url}
        {...otherProps}
        className={`${
          location.pathname === url
            ? 'border-rose-600 text-blue-gray-900 '
            : 'border-transparent text-blue-gray-500 hover:border-blue-gray-300 hover:text-blue-gray-700'
        } inline-flex items-center px-1 pt-1 border-b-2 capitalize text-sm font-medium font-hind`}
      >
        {children}
      </Link>
    );
  } else if (type === 'mobile') {
    Component = (
      <Link
        to={url}
        {...otherProps}
        className={`${
          location.pathname === url
            ? 'bg-red-50 border-red-500 text-red-700'
            : 'border-transparent text-blue-gray-600 hover:bg-blue-gray-50 hover:border-blue-gray-300 hover:text-blue-gray-800'
        } block pl-3 pr-4 py-2 border-l-4 text-base font-medium font-hind`}
      >
        {children}
      </Link>
    );
  } else {
    Component = (
      <Link
        to={url}
        {...otherProps}
        className={`block px-4 py-2 ${
          custom ? custom : 'text-sm text-blue-gray-700 hover:bg-blue-gray-100'
        } font-hind`}
      >
        {children}
      </Link>
    );
  }
  return Component;
};

export default CustomLink;
