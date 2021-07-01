import axios from 'axios';

import {
  CART_ADD_PRODUCT,
  CART_UPDATE_PRODUCT,
  CART_REMOVE_PRODUCT,
  CART_CREATE_REQUEST,
  CART_CREATE_SUCCESS,
  CART_CREATE_FAIL,
  CART_DETAILS_REQUEST,
  CART_DETAILS_SUCCESS,
  CART_DETAILS_FAIL,
  EMPTY_CART_REQUEST,
  EMPTY_CART_SUCCESS,
  EMPTY_CART_FAIL,
} from './cart.types';

export const addToCart = (cartItem) => async (dispatch, getState) => {
  dispatch({
    type: CART_ADD_PRODUCT,
    payload: cartItem,
  });
  localStorage.setItem('cart', JSON.stringify(getState().cart.cartProducts));
};

export const updateCart =
  (quantity, cartItemId) => async (dispatch, getState) => {
    const cart = JSON.parse(localStorage.getItem('cart'));

    const updatedCart = cart.map((product) =>
      product?._id === cartItemId ? { ...product, quantity } : product
    );

    dispatch({
      type: CART_UPDATE_PRODUCT,
      payload: updatedCart,
    });
    localStorage.setItem('cart', JSON.stringify(getState().cart.cartProducts));
  };

export const removeFromCart = (cartItemId) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_PRODUCT,
    payload: cartItemId,
  });

  localStorage.setItem('cart', JSON.stringify(getState().cart.cartProducts));
};

export const createCart = (cart) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CART_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: userInfo.token,
      },
    };

    const { data } = await axios.post(`/api/v1/cart/`, { cart }, config);

    dispatch({
      type: CART_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CART_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listCartDetails = (token) => async (dispatch) => {
  try {
    dispatch({ type: CART_DETAILS_REQUEST });

    const config = {
      headers: {
        Authorization: token,
      },
    };

    const { data } = await axios.get(`/api/v1/cart/`, config);
    dispatch({
      type: CART_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CART_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const emptyUserCart = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: EMPTY_CART_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: userInfo.token,
      },
    };

    const { data } = await axios.delete(`/api/v1/cart/`, config);

    dispatch({
      type: EMPTY_CART_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EMPTY_CART_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};