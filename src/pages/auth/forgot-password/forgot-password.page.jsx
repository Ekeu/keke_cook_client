import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { LoginIcon } from '@heroicons/react/outline';

import {
  SIGN_IN_FORGOT_PASSWORD,
  SIGN_IN_PAGE_BUTTON_SUBMIT,
  SIGN_IN_FORGOT_PASSWORD_DESCRIPTION,
  SIGN_IN_FORGOT_PASSWORD_NOTIFICATION,
  SIGN_IN_LINK_ON_FORGOT_PASSWORD_PAGE,
} from '../../../constants/auth.constants';

import { auth } from '../../../firebase/firebase';

import Logo from '../../../assets/images/keke_cook_logo.svg';

import FormInput from '../../../components/form-input/form-input.component.jsx';
import Notification from '../../../components/notification/notification.component.jsx';
import CustomButton from '../../../components/custom-button/custom-button.component.jsx';
import CustomLink from '../../../components/custom-link/custom-link.component.jsx';

const ForgotPassword = ({ history }) => {
  const [loading, setLoading] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.token) {
      history.push('/');
    }
  }, [history, userInfo]);

  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = handleSubmit(async ({ email }) => {
    setLoading(true);
    const actionCodeSettings = {
      url: process.env.REACT_APP_PASSWORD_RESET_REDIRECT_URL,
      handleCodeInApp: true,
    };
    try {
      await auth.sendPasswordResetEmail(email, actionCodeSettings);
      setLoading(false);
      setValue('email', '');
      toast(
        <Notification success headline='Vérifiez votre boite mail'>
          {SIGN_IN_FORGOT_PASSWORD_NOTIFICATION}
          {email}
        </Notification>
      );
    } catch (error) {
      setLoading(false);
      toast(
        <Notification error headline='Erreur de connexion'>
          {error.message}
        </Notification>
      );
    }
  });

  return (
    <div className='min-h-screen bg-blue-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <img className='mx-auto h-12 w-auto' src={Logo} alt='Keke Cook' />
        <h2 className='mt-6 text-center text-3xl font-hind font-extrabold text-blue-gray-900'>
          {SIGN_IN_FORGOT_PASSWORD}
        </h2>
        <p className='mt-2 text-center text-sm font-hind text-blue-gray-600'>
          {SIGN_IN_FORGOT_PASSWORD_DESCRIPTION}
        </p>
      </div>

      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          <form className='space-y-6' onSubmit={onSubmit}>
            <FormInput
              id='email'
              name='email'
              type='email'
              label='email'
              labelText='Adresse E-mail'
              autoComplete='email'
              register={register('email', {
                required: 'Saisissez une adresse e-mail',
                pattern: {
                  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  message: 'Saisissez une adresse email valide',
                },
              })}
              placeholder='monks.hot@shopping.com'
              error={errors.email?.message}
              autoFocus
            />

            <div>
              <CustomButton
                type='submit'
                loading={loading}
                customStyles='border border-transparent text-white bg-rose-600 hover:bg-rose-700'
              >
                {SIGN_IN_PAGE_BUTTON_SUBMIT}
              </CustomButton>
            </div>
            <div className='mt-6'>
              <div className='relative'>
                <div className='absolute inset-0 flex items-center'>
                  <div className='w-full border-t border-blue-gray-300' />
                </div>
                <div className='relative flex justify-center text-sm'>
                  <span className='px-2 bg-white text-blue-gray-500'>Ou</span>
                </div>
              </div>
              <div className='mt-6'>
                <CustomLink
                  type='link-button'
                  url='/login'
                  custom='px-5 py-3 text-base font-medium text-white bg-blue-gray-800 w-full'
                >
                  <LoginIcon
                    className='-ml-1 mr-2 h-6 w-6'
                    aria-hidden='true'
                  />
                  {SIGN_IN_LINK_ON_FORGOT_PASSWORD_PAGE}
                </CustomLink>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
