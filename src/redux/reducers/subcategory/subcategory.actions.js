import axios from 'axios';
import {
  SUBCATEGORY_LIST_REQUEST,
  SUBCATEGORY_LIST_SUCCESS,
  SUBCATEGORY_LIST_FAIL,
  SUBCATEGORY_DETAILS_REQUEST,
  SUBCATEGORY_DETAILS_SUCCESS,
  SUBCATEGORY_DETAILS_FAIL,
  SUBCATEGORY_DELETE_REQUEST,
  SUBCATEGORY_DELETE_SUCCESS,
  SUBCATEGORY_DELETE_FAIL,
  SUBCATEGORY_CREATE_REQUEST,
  SUBCATEGORY_CREATE_SUCCESS,
  SUBCATEGORY_CREATE_FAIL,
  SUBCATEGORY_UPDATE_REQUEST,
  SUBCATEGORY_UPDATE_SUCCESS,
  SUBCATEGORY_UPDATE_FAIL,
} from './subcategory.types';

export const getSubCategories = () => async (dispatch) => {
  try {
    dispatch({ type: SUBCATEGORY_LIST_REQUEST });
    const { data } = await axios.get(`/api/v1/subcategories/`);
    dispatch({
      type: SUBCATEGORY_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SUBCATEGORY_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getSubcategory = (slug) => async (dispatch) => {
  try {
    dispatch({ type: SUBCATEGORY_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/v1/subcategories/${slug}`);
    dispatch({
      type: SUBCATEGORY_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SUBCATEGORY_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteSubcategory = (slug) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SUBCATEGORY_DELETE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: userInfo.token,
      },
    };
    await axios.delete(`/api/v1/subcategories/${slug}`, config);
    dispatch({
      type: SUBCATEGORY_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: SUBCATEGORY_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createSubcategory = (name, parentCategory) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SUBCATEGORY_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: userInfo.token,
      },
    };

    const { data } = await axios.post(`/api/v1/subcategories/`, { name, parentCategory }, config);

    dispatch({
      type: SUBCATEGORY_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: SUBCATEGORY_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateSubcategory = (slug, name, parentCategory) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: SUBCATEGORY_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: userInfo.token,
      },
    };
    const { data } = await axios.put(
      `/api/v1/subcategories/${slug}`,
      {name, parentCategory},
      config
    );

    dispatch({
      type: SUBCATEGORY_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SUBCATEGORY_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
