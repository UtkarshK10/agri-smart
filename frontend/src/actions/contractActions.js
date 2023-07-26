import axios from "axios";
import {
  CONTRACT_CREATE_FAIL,
  CONTRACT_CREATE_REQUEST,
  CONTRACT_CREATE_SUCCESS,
  CONTRACT_DETAILS_FAIL,
  CONTRACT_DETAILS_REQUEST,
  CONTRACT_DETAILS_SUCCESS,
  CONTRACT_LAND_LIST_FAIL,
  CONTRACT_LAND_LIST_REQUEST,
  CONTRACT_LAND_LIST_SUCCESS,
  CONTRACT_LIST_CONTRACTOR_FAIL,
  CONTRACT_LIST_CONTRACTOR_REQUEST,
  CONTRACT_LIST_CONTRACTOR_SUCCESS,
  CONTRACT_LIST_FARMER_FAIL,
  CONTRACT_LIST_FARMER_REQUEST,
  CONTRACT_LIST_FARMER_SUCCESS,
  CONTRACT_SETTLE_FAIL,
  CONTRACT_SETTLE_REQUEST,
  CONTRACT_SETTLE_SUCCESS,
} from "../constants/contractConstants";
import { logout } from "./userActions";

export const createContract = (contract) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CONTRACT_CREATE_REQUEST,
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

    const { data } = await axios.post(`/api/contracts`, contract, config);

    dispatch({
      type: CONTRACT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CONTRACT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listContractorContracts = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: CONTRACT_LIST_CONTRACTOR_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/contracts/contractor`, config);

    dispatch({
      type: CONTRACT_LIST_CONTRACTOR_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CONTRACT_LIST_CONTRACTOR_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listFarmerContracts = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: CONTRACT_LIST_FARMER_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/contracts/farmer`, config);

    dispatch({
      type: CONTRACT_LIST_FARMER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CONTRACT_LIST_FARMER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listLandContracts = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CONTRACT_LAND_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/contracts/lands/${id}`, config);

    dispatch({
      type: CONTRACT_LAND_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CONTRACT_LAND_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const settleContract = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CONTRACT_SETTLE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/contracts/${id}/settle`, {}, config);

    dispatch({
      type: CONTRACT_SETTLE_SUCCESS,
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
      type: CONTRACT_SETTLE_FAIL,
      payload: message,
    });
  }
};

export const listContractDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: CONTRACT_DETAILS_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/contracts/${id}`, config);
    dispatch({
      type: CONTRACT_DETAILS_SUCCESS,
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
      type: CONTRACT_DETAILS_FAIL,
      payload: message,
    });
  }
};
