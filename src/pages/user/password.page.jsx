import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

import { auth } from '../../firebase/firebase';
import firebase from '../../firebase/firebase';

import UserNav from '../../components/nav/user.nav.component';
import UserNavChildrenLayout from '../../components/nav/user.nav.children.layout.component';

import {
  SET_NEW_PASSWORD_HEADLINE,
  SET_NEW_PASSWORD_DESCRIPTION,
} from '../../constants/user.menu.constants';

import {
  UPDATE_USER_PASSWORD_BUTTON_SUBMIT,
  UPDATE_USER_PASSWORD_DO_NOT_MATCH,
  UPDATE_USER_PASSWORD_SUCCESS,
  UPDATE_USER_CURRENT_PASSWORD_ERROR,
} from '../../constants/auth.constants';

import FormInput from '../../components/form-input/form-input.component.jsx';
import Notification from '../../components/notification/notification.component.jsx';
import CustomButton from '../../components/custom-button/custom-button.component.jsx';

const Password = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const reAuthenticate = (currentPassword) => {
    const currentUser = auth.currentUser;
    const credentials = firebase.auth.EmailAuthProvider.credential(
      currentUser.email,
      currentPassword
    );
    return currentUser.reauthenticateWithCredential(credentials);
  };

  const resetInputs = () => {
    setLoading(false);
    setValue('currentPassword', '');
    setValue('newPassword', '');
    setValue('confirmPassword', '');
  };

  const onSubmit = handleSubmit(
    ({ currentPassword, newPassword, confirmPassword }) => {
      setLoading(true);
      if (newPassword !== confirmPassword) {
        resetInputs();
        toast(
          <Notification error headline='Erreur!'>
            {UPDATE_USER_PASSWORD_DO_NOT_MATCH}
          </Notification>
        );

        setLoading(false);
        return;
      }
      reAuthenticate(currentPassword)
        .then(() => {
          auth.currentUser
            .updatePassword(newPassword)
            .then(() => {
              resetInputs();
              toast(
                <Notification success headline='Changement réussie'>
                  {UPDATE_USER_PASSWORD_SUCCESS}
                </Notification>
              );
            })
            .catch((error) => {
              resetInputs();
              toast(
                <Notification error headline='Erreur!'>
                  {error.message} {/* TODO: Check error message */}
                </Notification>
              );
            });
        })
        .catch((error) => {
          resetInputs();
          toast(
            <Notification error headline='Erreur!'>
              {UPDATE_USER_CURRENT_PASSWORD_ERROR}
            </Notification>
          );
        });
    }
  );

  return (
    <>
      <UserNav>
        <UserNavChildrenLayout
          headline={SET_NEW_PASSWORD_HEADLINE}
          description={SET_NEW_PASSWORD_DESCRIPTION}
        >
          <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 mt-8'>
            <form className='space-y-6' onSubmit={onSubmit}>
              <FormInput
                id='currentPassword'
                name='currentPassword'
                type={showCurrentPassword ? 'text' : 'password'}
                autoComplete='new-password'
                labelText='Saisissez votre mot de passe actuel'
                label='currentPassword'
                placeholder='********'
                register={register('currentPassword', {
                  required: 'Saisissez votre mot de passe actuel',
                })}
                showPassword={showCurrentPassword}
                togglePassword={() =>
                  setShowCurrentPassword(!showCurrentPassword)
                }
                error={errors.currentPassword?.message}
                passwordEyeIcon
              />
              <FormInput
                id='newPassword'
                name='newPassword'
                type={showNewPassword ? 'text' : 'password'}
                autoComplete='new-password'
                labelText='Saisissez votre nouveau mot de passe'
                label='newPassword'
                placeholder='********'
                register={register('newPassword', {
                  required: 'Saisissez votre nouveau mot de passe',
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
                showPassword={showNewPassword}
                togglePassword={() => setShowNewPassword(!showNewPassword)}
                error={errors.newPassword?.message}
                passwordEyeIcon
              />
              <FormInput
                id='confirmPassword'
                name='confirmPassword'
                type={showConfirmPassword ? 'text' : 'password'}
                autoComplete='off'
                labelText='Resaisissez votre nouveau mot de passe'
                label='confirmPassword'
                placeholder='********'
                register={register('confirmPassword', {
                  required: 'Resaisissez votre nouveau mot de passe',
                })}
                showPassword={showConfirmPassword}
                togglePassword={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                error={errors.confirmPassword?.message}
                passwordEyeIcon
              />

              <div>
                <CustomButton
                  type='submit'
                  loading={loading}
                  customStyles='border border-transparent text-white bg-rose-600 hover:bg-rose-700 w-max'
                >
                  {UPDATE_USER_PASSWORD_BUTTON_SUBMIT}
                </CustomButton>
              </div>
            </form>
          </div>
        </UserNavChildrenLayout>
      </UserNav>
    </>
  );
};

export default Password;
