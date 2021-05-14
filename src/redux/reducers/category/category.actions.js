import axios from 'axios';
import {
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_DETAILS_REQUEST,
  CATEGORY_DETAILS_SUCCESS,
  CATEGORY_DETAILS_FAIL,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DELETE_FAIL,
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_CREATE_FAIL,
  CATEGORY_UPDATE_REQUEST,
  CATEGORY_UPDATE_SUCCESS,
  CATEGORY_UPDATE_FAIL,
} from './category.types';

export const getCategories = () => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_LIST_REQUEST });
    const {data} = await axios.get(`/api/v1/categories/`);
    dispatch({
      type: CATEGORY_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getCategory = (slug) => async (dispatch) => {
  try {
    //dispatch({ type: FOOD_DETAILS_REQUEST });
    const response = await axios.get(`/api/v1/categories/${slug}`);
    /* dispatch({
      type: FOOD_DETAILS_SUCCESS,
      payload: data,
    }); */
  } catch (error) {
    console.log(error);
    /* dispatch({
      type: FOOD_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    }); */
  }
};

export const deleteCategory = (slug) => async (dispatch, getState) => {
  try {
    /* dispatch({
      type: FOOD_DELETE_REQUEST,
    }); */

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: userInfo.token,
      },
    };

    await axios.delete(`/api/v1/categories/${slug}`, config);

    /* dispatch({
      type: FOOD_DELETE_SUCCESS,
    }); */
  } catch (error) {
    console.log(error);
    /* dispatch({
      type: FOOD_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    }); */
  }
};

export const createCategory = (name) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CATEGORY_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: userInfo.token,
      },
    };

    const { data } = await axios.post(`/api/v1/categories/`, { name }, config);

    dispatch({
      type: CATEGORY_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: CATEGORY_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateCategory = (slug, category) => async (
  dispatch,
  getState
) => {
  try {
    /* dispatch({
      type: FOOD_UPDATE_REQUEST,
    }); */

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: userInfo.token,
      },
    };
    const response = await axios.put(
      `/api/v1/categories/${slug}`,
      category,
      config
    );

    /* dispatch({
      type: FOOD_UPDATE_SUCCESS,
      payload: data,
    }); */
  } catch (error) {
    console.log(error);
    /* dispatch({
      type: FOOD_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    }); */
  }
};
