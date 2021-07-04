import axios from 'axios';
import {
  COUPON_LIST_REQUEST,
  COUPON_LIST_SUCCESS,
  COUPON_LIST_FAIL,
  COUPON_DELETE_REQUEST,
  COUPON_DELETE_SUCCESS,
  COUPON_DELETE_FAIL,
  COUPON_CREATE_REQUEST,
  COUPON_CREATE_SUCCESS,
  COUPON_CREATE_FAIL,
} from './coupon.types';

export const getCoupons = () => async (dispatch) => {
  try {
    dispatch({ type: COUPON_LIST_REQUEST });
    const { data } = await axios.get(`/api/v1/coupon`);
    dispatch({
      type: COUPON_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COUPON_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteCoupon = (_id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COUPON_DELETE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: userInfo.token,
      },
    };
    const {data} = await axios.delete(`/api/v1/coupon/${_id}`, config);
    dispatch({
      type: COUPON_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COUPON_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createCoupon = (coupon) => async (dispatch, getState) => {
  console.log(coupon)
  try {
    dispatch({
      type: COUPON_CREATE_REQUEST,
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
      `/api/v1/coupon/`,
      { coupon },
      config
    );

    dispatch({
      type: COUPON_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: COUPON_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
