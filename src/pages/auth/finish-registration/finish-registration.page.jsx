import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import FormInput from '../../../components/form-input/form-input.component.jsx';
import CustomButton from '../../../components/custom-button/custom-button.component.jsx';
import Notification from '../../../components/notification/notification.component.jsx';

import {
  SIGN_UP_PAGE_FINISH_REGISTRATION,
  SIGN_IN_LINK_ON_SIGN_UP_PAGE,
  SIGN_UP_PAGE_BUTTON_SUBMIT,
  SIGN_UP_FINISH_HEADLINE_SUCCESS_NOTIFICATION,
  SIGN_UP_FINISH_BODY_SUCCESS_NOTIFICATION,
  SIGN_UP_FINISH_HEADLINE_ERROR_NOTIFICATION,
  SIGN_UP_FINISH_BODY_ERROR_NOTIFICATION,
} from '../../../constants/auth.constants';
import { auth } from '../../../firebase/firebase';
import { generateGravatar } from '../../../utils/functions';

import Logo from '../../../assets/images/keke_cook_logo.svg';

const FinishRegistration = ({ history }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  useEffect(() => {
    setEmail(localStorage.getItem('userRegistrationEmail'));
  }, []);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = handleSubmit(async ({ displayName, password }) => {
    try {
      setLoading(true);
      const res = await auth.signInWithEmailLink(email, window.location.href);
      if (res.user.emailVerified) {
        localStorage.removeItem('userRegistrationEmail');
        const currentUser = auth.currentUser;
        await currentUser.updatePassword(password);
        await currentUser.updateProfile({
          displayName,
          photoURL: res.user.photoURL
            ? res.user.photoURL
            : generateGravatar(email),
        });
        //const idTokenResult = await currentUser.getIdTokenResult();
        //console.table(currentUser, idTokenResult);
      }
      history.push('/');
      toast(
        <Notification
          success
          headline={SIGN_UP_FINISH_HEADLINE_SUCCESS_NOTIFICATION}
        >
          {SIGN_UP_FINISH_BODY_SUCCESS_NOTIFICATION}
        </Notification>
      );
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast(
        <Notification
          error
          headline={SIGN_UP_FINISH_HEADLINE_ERROR_NOTIFICATION}
        >
          {SIGN_UP_FINISH_BODY_ERROR_NOTIFICATION}
        </Notification>
      );
      setLoading(false);
    }
  });

  return (
    <div className='min-h-screen bg-white flex'>
      <div className='flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24'>
        <div className='mx-auto w-full max-w-sm lg:w-96'>
          <div>
            <img className='h-12 w-auto' src={Logo} alt='Keke Cook' />
            <h2 className='mt-6 text-3xl font-extrabold text-blue-gray-800 font-hind tracking-tight'>
              {SIGN_UP_PAGE_FINISH_REGISTRATION}
            </h2>
            <p className='mt-2 text-sm text-blue-gray-600'>
              Ou{' '}
              <Link
                to='/signin'
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
                  value={email}
                  placeholder='monks.hot@shopping.com'
                  error={errors.email?.message}
                  disabled
                />
                <FormInput
                  id='displayName'
                  name='displayName'
                  type='text'
                  label='displayName'
                  labelText="Nom d'Utilisateur"
                  autoComplete='username'
                  register={register('displayName', {
                    required: "Saisissez un nom d'utilisateur",
                    maxLength: {
                      value: 15,
                      message: "Votre nom d'utilisateur est trop long",
                    },
                    minLength: {
                      value: 3,
                      message: "Votre nom d'utilisateur est trop court",
                    },
                  })}
                  placeholder='monks___'
                  error={errors.displayName?.message}
                />
                <FormInput
                  id='password'
                  name='password'
                  type={showPassword ? 'text' : 'password'}
                  autoComplete='new-password'
                  labelText='Mot de passe'
                  label='password'
                  placeholder='********'
                  register={register('password', {
                    required: 'Entrez un mot de passe',
                    minLength: {
                      value: 8,
                      message: 'Utilisez au moins 8 caractères',
                    },
                    validate: (value) => {
                      return (
                        [
                          /[a-z]/,
                          /[A-Z]/,
                          /[0-9]/,
                          /[^a-zA-Z0-9]/,
                        ].every((pattern) => pattern.test(value)) ||
                        'Utilisez au moins huit caractères avec des lettres (maj & min), des chiffres et des symboles'
                      );
                    },
                  })}
                  showPassword={showPassword}
                  togglePassword={togglePassword}
                  error={errors.password?.message}
                  passwordEyeIcon
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

export default FinishRegistration;
