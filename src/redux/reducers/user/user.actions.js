import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  CREATE_ADDRESS_REQUEST,
  CREATE_ADDRESS_SUCCESS,
  CREATE_ADDRESS_FAIL,
  UPDATE_ADDRESS_REQUEST,
  UPDATE_ADDRESS_SUCCESS,
  UPDATE_ADDRESS_FAIL,
  ADDRESS_DETAILS_REQUEST,
  ADDRESS_DETAILS_SUCCESS,
  ADDRESS_DETAILS_FAIL,
  DELETE_ADDRESS_REQUEST,
  DELETE_ADDRESS_SUCCESS,
  DELETE_ADDRESS_FAIL,
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
    const { data } = await axios.post(
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
      payload: { ...data, token: idTokenResult.token },
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
    const { data } = await axios.post(
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
        ...data,
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
              const { data } = await axios.post(
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
                  ...data,
                  token: idTokenResult.token,
                },
              });
              dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: {
                  ...data,
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
    const { data } = await axios.get('/api/v1/auth/current', {
      headers: {
        Authorization: token,
      },
    });
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: {
        ...data,
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

export const addAddress = (address) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_ADDRESS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: userInfo.token,
      },
    };

    const { data } = await axios.post(
      `/api/v1/user/address/add/`,
      address,
      config
    );

    dispatch({
      type: CREATE_ADDRESS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_ADDRESS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateAddress = (_id, address) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPDATE_ADDRESS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: userInfo.token,
      },
    };

    const { data } = await axios.put(
      `/api/v1/user/address/update/${_id}`,
      address,
      config
    );

    dispatch({
      type: UPDATE_ADDRESS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_ADDRESS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAddress = (_id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADDRESS_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: userInfo.token,
      },
    };

    const { data } = await axios.get(`/api/v1/user/address/${_id}`, config);

    dispatch({
      type: ADDRESS_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADDRESS_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteAddress = (_id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_ADDRESS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: userInfo.token,
      },
    };

    const { data } = await axios.delete(
      `/api/v1/user/address/delete/${_id}`,
      config
    );

    dispatch({
      type: DELETE_ADDRESS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_ADDRESS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
