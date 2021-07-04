import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import {
  CART_ADD_PRODUCT,
  CART_UPDATE_PRODUCT,
  CART_REMOVE_PRODUCT,
  CART_RESET_PRODUCT,
  CART_CREATE_REQUEST,
  CART_CREATE_SUCCESS,
  CART_CREATE_FAIL,
  CART_CREATE_RESET,
  CART_DETAILS_REQUEST,
  CART_DETAILS_SUCCESS,
  CART_DETAILS_FAIL,
  CART_DETAILS_RESET,
  EMPTY_CART_REQUEST,
  EMPTY_CART_SUCCESS,
  EMPTY_CART_FAIL,
  EMPTY_CART_RESET,
} from './cart.types';

export const cartReducer = (state = { cartProducts: [] }, action) => {
  switch (action.type) {
    case CART_ADD_PRODUCT:
      const payload = action.payload;
      return {
        ...state,
        cartProducts: _.uniqWith([...state.cartProducts, {...payload, c_id: uuidv4()}], _.isEqual),
      };
    case CART_UPDATE_PRODUCT:
      return {
        ...state,
        cartProducts: [...action.payload],
      };
    case CART_REMOVE_PRODUCT:
      return {
        ...state,
        cartProducts: state.cartProducts.filter(
          (product) => product.c_id !== action.payload
        ),
      };
    case CART_RESET_PRODUCT:
      return { cartProducts: [] };
    default:
      return state;
  }
};

export const cartCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CART_CREATE_REQUEST:
      return { loading: true };
    case CART_CREATE_SUCCESS:
      return { loading: false, success: true, createdCart: action.payload };
    case CART_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case CART_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const cartDetailsReducer = (state = { cart: {} }, action) => {
  switch (action.type) {
    case CART_DETAILS_REQUEST:
      return { loading: true, ...state };
    case CART_DETAILS_SUCCESS:
      return { loading: false, success: true, cart: action.payload };
    case CART_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case CART_DETAILS_RESET:
      return { cart: {} };
    default:
      return state;
  }
};

export const emptyCartReducer = (state = {}, action) => {
  switch (action.type) {
    case EMPTY_CART_REQUEST:
      return { loading: true };
    case EMPTY_CART_SUCCESS:
      return { loading: false, success: true, cart: action.payload };
    case EMPTY_CART_FAIL:
      return { loading: false, error: action.payload };
    case EMPTY_CART_RESET:
      return {};
    default:
      return state;
  }
};
