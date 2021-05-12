import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import FormInput from '../../../components/form-input/form-input.component.jsx';
import CustomButton from '../../../components/custom-button/custom-button.component.jsx';
import Notification from '../../../components/notification/notification.component.jsx';

import { registerUser } from '../../../redux/reducers/user/user.actions';

import {
  SIGN_UP_PAGE_FINISH_REGISTRATION,
  SIGN_IN_LINK_ON_SIGN_UP_PAGE,
  SIGN_UP_PAGE_BUTTON_SUBMIT,
  SIGN_UP_FINISH_HEADLINE_ERROR_NOTIFICATION,
} from '../../../constants/auth.constants';

import Logo from '../../../assets/images/keke_cook_logo.svg';

const FinishRegistration = ({ history }) => {
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);

  const { loading, error, userInfo } = userRegister;

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  useEffect(() => {
    if (error) {
      toast(
        <Notification
          error
          headline={SIGN_UP_FINISH_HEADLINE_ERROR_NOTIFICATION}
        >
          {error}
        </Notification>
      );
    } else {
      if (userInfo) {
        history.push('/');
      } else {
        setEmail(localStorage.getItem('userRegistrationEmail'));
      }
    }
  }, [history, userInfo, error]);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = handleSubmit(async ({ displayName, password }) => {
    dispatch(registerUser(displayName, password, email));
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
