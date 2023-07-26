import axios from "axios";
import {
  ALL_LANDS_LIST_FAIL,
  ALL_LANDS_LIST_REQUEST,
  ALL_LANDS_LIST_SUCCESS,
  LAND_CREATE_FAIL,
  LAND_CREATE_REQUEST,
  LAND_CREATE_SUCCESS,
  LAND_DELETE_FAIL,
  LAND_DELETE_REQUEST,
  LAND_DELETE_SUCCESS,
  LAND_DETAILS_FAIL,
  LAND_DETAILS_REQUEST,
  LAND_DETAILS_SUCCESS,
  LAND_UPDATE_FAIL,
  LAND_UPDATE_REQUEST,
  LAND_UPDATE_SUCCESS,
  MY_LANDS_LIST_FAIL,
  MY_LANDS_LIST_REQUEST,
  MY_LANDS_LIST_SUCCESS,
} from "../constants/landConstants";
import { logout } from "./userActions";

export const listMyLands = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: MY_LANDS_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/lands/mylands`, config);

    dispatch({
      type: MY_LANDS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MY_LANDS_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listAllLands = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ALL_LANDS_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/lands`, config);

    dispatch({
      type: ALL_LANDS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_LANDS_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listLandDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: LAND_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/lands/${id}`);
    dispatch({
      type: LAND_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LAND_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteLand = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: LAND_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/lands/${id}`, config);

    dispatch({
      type: LAND_DELETE_SUCCESS,
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
      type: LAND_DELETE_FAIL,
      payload: message,
    });
  }
};

export const updateLand = (land) => async (dispatch, getState) => {
  try {
    dispatch({
      type: LAND_UPDATE_REQUEST,
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

    console.log(land);

    const { data } = await axios.put(`/api/lands/${land._id}`, land, config);

    dispatch({
      type: LAND_UPDATE_SUCCESS,
      payload: data,
    });
    dispatch({ type: LAND_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: LAND_UPDATE_FAIL,
      payload: message,
    });
  }
};

export const createLand = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: LAND_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/lands`, {}, config);

    dispatch({
      type: LAND_CREATE_SUCCESS,
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
      type: LAND_CREATE_FAIL,
      payload: message,
    });
  }
};
