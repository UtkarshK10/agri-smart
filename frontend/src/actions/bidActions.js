import axios from "axios";
import {
  BID_APPROVE_FAIL,
  BID_APPROVE_REQUEST,
  BID_APPROVE_SUCCESS,
  BID_CREATE_FAIL,
  BID_CREATE_REQUEST,
  BID_CREATE_SUCCESS,
  BID_LAND_LIST_FAIL,
  BID_LAND_LIST_REQUEST,
  BID_LAND_LIST_SUCCESS,
  BID_LIST_MY_FAIL,
  BID_LIST_MY_REQUEST,
  BID_LIST_MY_RESET,
  BID_LIST_MY_SUCCESS,
  BID_PAY_FAIL,
  BID_PAY_REQUEST,
  BID_PAY_SUCCESS,
} from "../constants/bidConstants";
import { logout } from "./userActions";

export const createBid = (bid) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BID_CREATE_REQUEST,
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

    const { data } = await axios.post(`/api/bids`, bid, config);

    dispatch({
      type: BID_CREATE_SUCCESS,
      payload: data,
    });
    dispatch({ type: BID_LIST_MY_RESET });
  } catch (error) {
    dispatch({
      type: BID_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listMyBids = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: BID_LIST_MY_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/bids/contractorBids`, config);

    dispatch({
      type: BID_LIST_MY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BID_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listLandBids = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BID_LAND_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/bids/landBids/${id}`, config);

    dispatch({
      type: BID_LAND_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BID_LAND_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const approveBid = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BID_APPROVE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/bids/${id}/approve`, {}, config);

    dispatch({
      type: BID_APPROVE_SUCCESS,
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
      type: BID_APPROVE_FAIL,
      payload: message,
    });
  }
};

export const payBid = (bidId, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BID_PAY_REQUEST,
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
      `/api/bids/${bidId}/pay`,
      paymentResult,
      config
    );

    dispatch({
      type: BID_PAY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BID_PAY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
