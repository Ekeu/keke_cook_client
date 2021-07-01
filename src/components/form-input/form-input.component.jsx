import React, { forwardRef } from 'react';
import {
  ExclamationCircleIcon,
  EyeIcon,
  EyeOffIcon,
} from '@heroicons/react/solid';

import SpinSVG from '../spin-svg/spin-svg.component';

const FormInput = forwardRef(
  (
    {
      handleChange,
      handlePaste,
      label,
      labelText,
      TrailingIcon,
      TrailingButton,
      error,
      errorTextColor,
      loadingActionButton,
      register,
      ringStyling,
      validation,
      togglePassword,
      showPassword,
      actionButton,
      passwordEyeIcon,
      formInputWrapperClass,
      helpText,
      idHelpText,
      inputStyles,
      ...otherProps
    },
    ref
  ) => {
    return (
      <div className={`${formInputWrapperClass}`}>
        {label && (
          <label
            htmlFor={label}
            className='block text-sm font-medium text-blue-gray-700 font-hind text-left'
          >
            {labelText}
          </label>
        )}
        <div className='mt-1 relative flex rounded-md shadow-sm'>
          <input
            {...otherProps}
            onChange={handleChange}
            onPaste={handlePaste}
            {...register}
            className={`${
              error
                ? 'pr-10 border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500'
                : `border-blue-gray-300 placeholder-blue-gray-500 ${
                    ringStyling
                      ? ringStyling
                      : 'focus:ring-transparent focus:border-blue-gray-300'
                  }`
            } appearance-none block w-full 
              py-3 px-5
           sm:text-sm font-hind ${
             TrailingButton ? 'rounded-none rounded-l-md' : 'rounded-md'
           } focus:outline-none ${inputStyles}`}
          />
          {TrailingButton && (
            <button
              type='button'
              onClick={actionButton}
              className='-ml-px relative inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-r-md text-white bg-rose-500 hover:bg-rose-600 focus:outline-none'
            >
              {loadingActionButton ? (
                <SpinSVG size={'h-5 w-5'} color={'text-white'} />
              ) : (
                <TrailingButton
                  className='h-5 w-5 text-white'
                  aria-hidden='true'
                />
              )}
            </button>
          )}
          {!error && (passwordEyeIcon || TrailingIcon) && (
            <div
              onClick={togglePassword}
              className={`absolute inset-y-0 right-0 pr-3 flex items-center ${
                TrailingIcon ? 'pointer-events-none' : 'cursor-pointer'
              }`}
            >
              {TrailingIcon ? (
                <TrailingIcon
                  className='h-5 w-5 text-blue-gray-400'
                  aria-hidden='true'
                />
              ) : showPassword ? (
                <EyeIcon
                  className='h-5 w-5 text-blue-gray-700'
                  aria-hidden='true'
                />
              ) : (
                <EyeOffIcon
                  className='h-5 w-5 text-blue-gray-700'
                  aria-hidden='true'
                />
              )}
            </div>
          )}

          {error && (
            <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
              <ExclamationCircleIcon
                className='h-5 w-5 text-red-500'
                aria-hidden='true'
              />
            </div>
          )}
        </div>
        {error && (
          <p
            className={`mt-2 text-sm text-left ${
              errorTextColor ? errorTextColor : 'text-red-600'
            }`}
            id='error'
          >
            {error}
          </p>
        )}
        {helpText && (
          <p
            className='mt-2 text-sm text-left text-blue-gray-500'
            id={idHelpText}
          >
            {helpText}
          </p>
        )}
      </div>
    );
  }
);

export default FormInput;
