import {
  CART_ADD_PRODUCT,
  CART_UPDATE_PRODUCT,
  CART_REMOVE_PRODUCT,
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
