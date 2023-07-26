import axios from "axios";
import {
  ALL_PRODUCES_LIST_FAIL,
  ALL_PRODUCES_LIST_REQUEST,
  ALL_PRODUCES_LIST_SUCCESS,
  MY_PRODUCES_LIST_FAIL,
  MY_PRODUCES_LIST_REQUEST,
  MY_PRODUCES_LIST_SUCCESS,
  MY_PURCHASES_LIST_FAIL,
  MY_PURCHASES_LIST_REQUEST,
  MY_PURCHASES_LIST_SUCCESS,
  MY_SALES_LIST_FAIL,
  MY_SALES_LIST_REQUEST,
  MY_SALES_LIST_SUCCESS,
  PRODUCE_CREATE_FAIL,
  PRODUCE_CREATE_REQUEST,
  PRODUCE_CREATE_SUCCESS,
  PRODUCE_DELETE_FAIL,
  PRODUCE_DELETE_REQUEST,
  PRODUCE_DELETE_SUCCESS,
  PRODUCE_DELIVER_FAIL,
  PRODUCE_DELIVER_REQUEST,
  PRODUCE_DELIVER_SUCCESS,
  PRODUCE_DETAILS_FAIL,
  PRODUCE_DETAILS_REQUEST,
  PRODUCE_DETAILS_SUCCESS,
  PRODUCE_PAY_FAIL,
  PRODUCE_PAY_REQUEST,
  PRODUCE_PAY_SUCCESS,
  PRODUCE_UPDATE_FAIL,
  PRODUCE_UPDATE_REQUEST,
  PRODUCE_UPDATE_SUCCESS,
} from "../constants/produceConstants";
import { logout } from "./userActions";

export const listMyProduces = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: MY_PRODUCES_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/produce/myproduces`, config);

    dispatch({
      type: MY_PRODUCES_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MY_PRODUCES_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listMyPurchases = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: MY_PURCHASES_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/produce/mypurchases`, config);

    dispatch({
      type: MY_PURCHASES_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MY_PURCHASES_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listMySales = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: MY_SALES_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/produce/mysales`, config);

    dispatch({
      type: MY_SALES_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MY_SALES_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listProduceDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCE_DETAILS_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/produce/${id}`, config);
    dispatch({
      type: PRODUCE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteProduce = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCE_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/produce/${id}`, config);

    dispatch({
      type: PRODUCE_DELETE_SUCCESS,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PRODUCE_DELETE_FAIL,
      payload: message,
    });
  }
};

export const updateProduce = (produce) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCE_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/produce/${produce._id}`,
      produce,
      config
    );

    dispatch({
      type: PRODUCE_UPDATE_SUCCESS,
      payload: data,
    });
    dispatch({ type: PRODUCE_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PRODUCE_UPDATE_FAIL,
      payload: message,
    });
  }
};

export const createProduce = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCE_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/produce`, {}, config);

    dispatch({
      type: PRODUCE_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PRODUCE_CREATE_FAIL,
      payload: message,
    });
  }
};

export const listAllProduces = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ALL_PRODUCES_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/produce`, config);

    dispatch({
      type: ALL_PRODUCES_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_PRODUCES_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const payProduce =
  (produceId, shippingAddress, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PRODUCE_PAY_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/produce/${produceId}/pay`,
        {
          shippingAddress,
          paymentResult,
        },
        config
      );

      dispatch({
        type: PRODUCE_PAY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PRODUCE_PAY_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deliverProduce = (produceId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCE_DELIVER_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/produce/${produceId}/deliver`,
      {},
      config
    );

    dispatch({
      type: PRODUCE_DELIVER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCE_DELIVER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
