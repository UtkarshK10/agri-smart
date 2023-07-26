import {
  BID_APPROVE_FAIL,
  BID_APPROVE_REQUEST,
  BID_APPROVE_RESET,
  BID_APPROVE_SUCCESS,
  BID_CREATE_FAIL,
  BID_CREATE_REQUEST,
  BID_CREATE_RESET,
  BID_CREATE_SUCCESS,
  BID_LAND_LIST_FAIL,
  BID_LAND_LIST_REQUEST,
  BID_LAND_LIST_RESET,
  BID_LAND_LIST_SUCCESS,
  BID_LIST_MY_FAIL,
  BID_LIST_MY_REQUEST,
  BID_LIST_MY_RESET,
  BID_LIST_MY_SUCCESS,
  BID_PAY_FAIL,
  BID_PAY_REQUEST,
  BID_PAY_RESET,
  BID_PAY_SUCCESS,
} from "../constants/bidConstants";

export const bidListMyReducer = (state = { bids: [] }, action) => {
  switch (action.type) {
    case BID_LIST_MY_REQUEST:
      return {
        loading: true,
      };
    case BID_LIST_MY_SUCCESS:
      return {
        loading: false,
        bids: action.payload,
      };
    case BID_LIST_MY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case BID_LIST_MY_RESET:
      return { bids: [] };
    default:
      return state;
  }
};

export const bidCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case BID_CREATE_REQUEST:
      return {
        loading: true,
      };
    case BID_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        bid: action.payload,
      };
    case BID_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case BID_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const bidListByLandReducer = (state = { bids: [] }, action) => {
  switch (action.type) {
    case BID_LAND_LIST_REQUEST:
      return {
        loading: true,
      };
    case BID_LAND_LIST_SUCCESS:
      return {
        loading: false,
        bids: action.payload,
      };
    case BID_LAND_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case BID_LAND_LIST_RESET:
      return { bids: [] };
    default:
      return state;
  }
};

export const bidApproveReducer = (state = {}, action) => {
  switch (action.type) {
    case BID_APPROVE_REQUEST:
      return {
        loading: true,
      };
    case BID_APPROVE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case BID_APPROVE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case BID_APPROVE_RESET:
      return {};
    default:
      return state;
  }
};

export const bidPayReducer = (state = {}, action) => {
  switch (action.type) {
    case BID_PAY_REQUEST:
      return {
        loading: true,
      };
    case BID_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case BID_PAY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case BID_PAY_RESET:
      return {};
    default:
      return state;
  }
};
