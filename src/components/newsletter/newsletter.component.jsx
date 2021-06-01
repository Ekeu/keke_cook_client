import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import MailchimpSubscribe from 'react-mailchimp-subscribe';

import FormInput from '../form-input/form-input.component.jsx';
import Notification from '../notification/notification.component.jsx';
import NewsLetterForm from '../newsletter/newsletter-form.component';
import CustomButton from '../custom-button/custom-button.component.jsx';

const Newsletter = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = handleSubmit(async ({ ctaEmail }) => {
    //
  });
  return (
    <div className='bg-white py-16 sm:py-24'>
      <div className='relative sm:py-16'>
        <div aria-hidden='true' className='hidden sm:block'>
          <div className='absolute inset-y-0 left-0 w-1/2 bg-blue-gray-50 rounded-r-3xl' />
          <svg
            className='absolute top-8 left-1/2 -ml-3'
            width={404}
            height={392}
            fill='none'
            viewBox='0 0 404 392'
          >
            <defs>
              <pattern
                id='E11D48-bcee-4ec8-905a-2a059a2cc4fb'
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits='userSpaceOnUse'
              >
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={4}
                  className='text-gray-200'
                  fill='currentColor'
                />
              </pattern>
            </defs>
            <rect
              width={404}
              height={392}
              fill='url(#E11D48-bcee-4ec8-905a-2a059a2cc4fb)'
            />
          </svg>
        </div>
        <div className='mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8'>
          <div className='relative rounded-2xl px-6 py-10 bg-rose-600 overflow-hidden shadow-xl sm:px-12 sm:py-20'>
            <div
              aria-hidden='true'
              className='absolute inset-0 -mt-72 sm:-mt-32 md:mt-0'
            >
              <svg
                className='absolute inset-0 h-full w-full'
                preserveAspectRatio='xMidYMid slice'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 1463 360'
              >
                <path
                  className='text-rose-500 text-opacity-40'
                  fill='currentColor'
                  d='M-82.673 72l1761.849 472.086-134.327 501.315-1761.85-472.086z'
                />
                <path
                  className='text-rose-700 text-opacity-40'
                  fill='currentColor'
                  d='M-217.088 544.086L1544.761 72l134.327 501.316-1761.849 472.086z'
                />
              </svg>
            </div>
            <div className='relative'>
              <div className='sm:text-center'>
                <h2 className='text-3xl font-extrabold text-white font-hind tracking-tight sm:text-4xl'>
                  Inscrivez vous à la newsletter Keke Cook
                </h2>
                <p className='mt-6 mx-auto max-w-2xl text-lg text-rose-200'>
                  Nous vous tiendrons au courant de toutes les nouvelles
                  recettes qui seront publier.
                </p>
              </div>
              <MailchimpSubscribe
                url={process.env.REACT_APP_MAILCHIMP_URL}
                render={({ subscribe, status, message }) => (
                  <NewsLetterForm
                    status={status}
                    message={message}
                    onValidated={(formData) => subscribe(formData)}
                  />
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
