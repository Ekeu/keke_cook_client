import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGOUT,
  CREATE_ADDRESS_REQUEST,
  CREATE_ADDRESS_SUCCESS,
  CREATE_ADDRESS_FAIL,
  CREATE_ADDRESS_RESET,
  UPDATE_ADDRESS_REQUEST,
  UPDATE_ADDRESS_SUCCESS,
  UPDATE_ADDRESS_FAIL,
  UPDATE_ADDRESS_RESET,
  ADDRESS_DETAILS_REQUEST,
  ADDRESS_DETAILS_SUCCESS,
  ADDRESS_DETAILS_FAIL,
  ADDRESS_DETAILS_RESET,
  DELETE_ADDRESS_REQUEST,
  DELETE_ADDRESS_SUCCESS,
  DELETE_ADDRESS_FAIL,
  DELETE_ADDRESS_RESET,
} from './user.types';

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { ...state, loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const addUserAddressReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ADDRESS_REQUEST:
      return { ...state, loading: true };
    case CREATE_ADDRESS_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case CREATE_ADDRESS_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_ADDRESS_RESET:
      return {};
    default:
      return state;
  }
};

export const updateUserAddressReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ADDRESS_REQUEST:
      return { ...state, loading: true };
    case UPDATE_ADDRESS_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case UPDATE_ADDRESS_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_ADDRESS_RESET:
      return {};
    default:
      return state;
  }
};

export const userDetailAddressReducer = (state = { address: {} }, action) => {
  switch (action.type) {
    case ADDRESS_DETAILS_REQUEST:
      return { ...state, loading: true };
    case ADDRESS_DETAILS_SUCCESS:
      return { loading: false, success: true, address: action.payload };
    case ADDRESS_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case ADDRESS_DETAILS_RESET:
      return { address: {} };
    default:
      return state;
  }
};

export const deleteUserAddressReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_ADDRESS_REQUEST:
      return { ...state, loading: true };
    case DELETE_ADDRESS_SUCCESS:
      return { loading: false, success: true };
    case DELETE_ADDRESS_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_ADDRESS_RESET:
      return {};
    default:
      return state;
  }
};
