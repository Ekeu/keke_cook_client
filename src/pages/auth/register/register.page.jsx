import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import FormInput from '../../../components/form-input/form-input.component.jsx';
import CustomButton from '../../../components/custom-button/custom-button.component.jsx';
import Notification from '../../../components/notification/notification.component.jsx';

import {
  SIGN_UP_PAGE,
  SIGN_IN_LINK_ON_SIGN_UP_PAGE,
  SIGN_UP_PAGE_BUTTON_SUBMIT,
  SIGN_UP_HEADLINE_NOTIFICATION,
  SIGN_UP_BODY_NOTIFICATION,
} from '../../../constants/auth.constants';
import { auth } from '../../../firebase/firebase';

import Logo from '../../../assets/images/keke_cook_logo.svg';

const Register = ({ history }) => {
  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.token) {
      history.push('/');
    }
  }, [history, userInfo]);

  const [loading, setLoading] = useState(false);
  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = handleSubmit(async ({ email }) => {
    const actionCodeSettings = {
      url: process.env.REACT_APP_RGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };
    setLoading(true);
    await auth.sendSignInLinkToEmail(email, actionCodeSettings);
    toast(
      <Notification success headline={SIGN_UP_HEADLINE_NOTIFICATION}>
        {SIGN_UP_BODY_NOTIFICATION}
        {email}
      </Notification>
    );
    setLoading(false);
    localStorage.setItem('userRegistrationEmail', email);
    setValue('email', '');
  });

  return (
    <div className='min-h-screen bg-white flex'>
      <div className='flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24'>
        <div className='mx-auto w-full max-w-sm lg:w-96'>
          <div>
            <img className='h-12 w-auto' src={Logo} alt='Keke Cook' />
            <h2 className='mt-6 text-3xl font-extrabold text-blue-gray-800 font-hind tracking-tight'>
              {SIGN_UP_PAGE}
            </h2>
            <p className='mt-2 text-sm text-blue-gray-600'>
              Ou{' '}
              <Link
                to='/login'
                className='font-medium text-rose-600 hover:text-rose-500'
              >
                {SIGN_IN_LINK_ON_SIGN_UP_PAGE}
              </Link>
            </p>
          </div>
          <div className='mt-8'>
            <div className='mt-6'>
              <form onSubmit={onSubmit} className='space-y-6'>
                <FormInput
                  id='email'
                  name='email'
                  type='email'
                  label='email'
                  labelText='Adresse E-mail'
                  autoComplete='email'
                  register={register('email', {
                    required: 'Saisissez une adresse email',
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
                    {SIGN_UP_PAGE_BUTTON_SUBMIT}
                  </CustomButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className='hidden lg:block relative w-0 flex-1'>
        <img
          className='absolute inset-0 h-full w-full object-cover'
          src={
            'https://res.cloudinary.com/dmcookpro/image/upload/v1620207767/keke-cook/colorful-macarons-cookies-french-cakes-sweet-colorful-french-macaroons-fall-fly-motion-with-slices_fh0ibv.jpg'
          }
          alt={'Macarons'}
        />
      </div>
    </div>
  );
};

export default Register;
