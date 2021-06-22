import _ from 'lodash';

import { CART_ADD_PRODUCT, CART_UPDATE_PRODUCT, CART_REMOVE_PRODUCT } from './cart.types';

export const cartReducer = (state = { cartProducts: [] }, action) => {
  switch (action.type) {
    case CART_ADD_PRODUCT:
      const payload = action.payload;
      return {
        ...state,
        cartProducts: _.uniqWith([...state.cartProducts, payload], _.isEqual),
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
          (product) => product._id !== action.payload
        ),
      };
    default:
      return state;
  }
};
