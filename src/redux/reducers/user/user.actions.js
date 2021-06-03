import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
} from './user.types';
import firebase from 'firebase';
import axios from 'axios';
import { auth, googleAuthProvider } from '../../../firebase/firebase';
import { generateGravatar } from '../../../utils/functions';

export const logout = () => (dispatch) => {
  firebase.auth().signOut();
  dispatch({ type: USER_LOGOUT });
};
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    const result = await auth.signInWithEmailAndPassword(email, password);
    const { user } = result;
    const idTokenResult = await user.getIdTokenResult();
    const res = await axios.post(
      '/api/v1/auth',
      {},
      {
        headers: {
          Authorization: idTokenResult.token,
        },
      }
    );
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: {
        email: res?.data?.email,
        displayName: res?.data.displayName,
        photoURL: res?.data.photoURL,
        role: res?.data.role,
        _id: res?.data._id,
        token: idTokenResult.token,
      },
    });
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: 'Identifiant ou mot de passe incorrect!',
    });
  }
};
export const loginWithGoogle = () => async (dispatch) => {
  try {
    const result = await auth.signInWithPopup(googleAuthProvider);
    const { user } = result;
    const idTokenResult = await user.getIdTokenResult();
    const res = await axios.post(
      '/api/v1/auth',
      {},
      {
        headers: {
          Authorization: idTokenResult.token,
        },
      }
    );
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: {
        email: res?.data?.email,
        displayName: res?.data?.displayName,
        photoURL: res?.data?.photoURL,
        role: res?.data?.role,
        _id: res?.data?._id,
        token: idTokenResult.token,
      },
    });
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: "Une erreur s'est produite l'ors de la connexion avec Google",
    });
  }
};
export const registerUser =
  (displayName, password, email) => async (dispatch) => {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });
    try {
      const signInRes = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      if (signInRes.user.emailVerified) {
        localStorage.removeItem('userRegistrationEmail');
        const currentUser = auth.currentUser;
        await currentUser.updatePassword(password);
        currentUser
          .updateProfile({
            displayName,
            photoURL: signInRes.user.photoURL
              ? signInRes.user.photoURL
              : generateGravatar(email),
          })
          .then(
            async () => {
              const idTokenResult = await currentUser.getIdTokenResult(true);
              const res = await axios.post(
                '/api/v1/auth',
                {},
                {
                  headers: {
                    Authorization: idTokenResult.token,
                  },
                }
              );
              dispatch({
                type: USER_REGISTER_SUCCESS,
                payload: {
                  email: res?.data.email,
                  displayName: res?.data.displayName,
                  photoURL: res?.data.photoURL,
                  role: res?.data.role,
                  _id: res?.data._id,
                  token: idTokenResult.token,
                },
              });
              dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: {
                  email: res?.data.email,
                  displayName: res?.data.displayName,
                  photoURL: res?.data.photoURL,
                  role: res?.data.role,
                  _id: res?.data._id,
                  token: idTokenResult.token,
                },
              });
            },
            (error) => {
              throw error;
            }
          );
      }
    } catch (err) {
      console.log(err);
      dispatch({
        type: USER_REGISTER_FAIL,
        payload: "Une erreur s'est produite. Veuillez réessayer",
      });
    }
  };
export const getCurrentUser = (token) => async (dispatch) => {
  try {
    const res = await axios.get('/api/v1/auth/current', {
      headers: {
        Authorization: token,
      },
    });
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: {
        email: res?.data?.email,
        displayName: res?.data?.displayName,
        photoURL: res?.data?.photoURL,
        role: res?.data?.role,
        _id: res?.data?._id,
        token,
      },
    });
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
