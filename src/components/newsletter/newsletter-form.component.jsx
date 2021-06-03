import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import FormInput from '../form-input/form-input.component.jsx';
import Notification from '../notification/notification.component.jsx';
import CustomButton from '../custom-button/custom-button.component.jsx';

const NewsLetterForm = ({ status, message, onValidated }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = handleSubmit(async ({ ctaEmail }) => {
    onValidated({ EMAIL: ctaEmail });
  });

  useEffect(() => {
    status === 'error' &&
      toast(
        <Notification error headline='Erreur de création'>
          {message}
        </Notification>
      );
    status === 'success' &&
      toast(
        <Notification success headline='Merci!'>
          {message}
        </Notification>
      );
  }, [status, message]);
  return (
    <>
      <form
        onSubmit={onSubmit}
        className='mt-12 sm:mx-auto sm:max-w-lg sm:flex'
      >
        <div className='min-w-0 flex-1'>
          <FormInput
            id='ctaEmail'
            name='ctaEmail'
            type='ctaEmail'
            autoComplete='email'
            ringStyling='focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-rose-600'
            errorTextColor='text-white'
            register={register('ctaEmail', {
              required: 'Saisissez une adresse e-mail',
              pattern: {
                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                message: 'Saisissez une adresse email valide',
              },
            })}
            placeholder='ulrich.monkam@gmail.com'
            error={errors.ctaEmail?.message}
          />
        </div>
        <div className='mt-4 sm:mt-0 sm:ml-3'>
          <CustomButton
            type='submit'
            loading={status === 'sending' ? true : false}
            loaderHeight={'h-6'}
            loaderWidth={'h-6'}
            customStyles='w-full block border border-transparent px-5 py-3 text-white bg-rose-500 hover:bg-rose-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-rose-600 sm:px-10'
          >
            S'abonner
          </CustomButton>
        </div>
      </form>
    </>
  );
};

export default NewsLetterForm;
