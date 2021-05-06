import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from './user.types';
import firebase from 'firebase';
import { auth, googleAuthProvider } from '../../../firebase/firebase';

export const setCurrentUser = (user) => (dispatch) => {
  dispatch({
    type: USER_LOGIN_SUCCESS,
    payload: user,
  });
};
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
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        token: idTokenResult,
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
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        token: idTokenResult,
      },
    });
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: "Une erreur s'est produite l'ors de la connexion avec Google",
    });
  }
};
