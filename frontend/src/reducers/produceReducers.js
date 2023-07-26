import {
  ALL_PRODUCES_LIST_FAIL,
  ALL_PRODUCES_LIST_REQUEST,
  ALL_PRODUCES_LIST_SUCCESS,
  MY_PRODUCES_LIST_FAIL,
  MY_PRODUCES_LIST_REQUEST,
  MY_PRODUCES_LIST_SUCCESS,
  MY_PURCHASES_LIST_FAIL,
  MY_PURCHASES_LIST_REQUEST,
  MY_PURCHASES_LIST_RESET,
  MY_PURCHASES_LIST_SUCCESS,
  MY_SALES_LIST_FAIL,
  MY_SALES_LIST_REQUEST,
  MY_SALES_LIST_RESET,
  MY_SALES_LIST_SUCCESS,
  PRODUCE_CREATE_FAIL,
  PRODUCE_CREATE_REQUEST,
  PRODUCE_CREATE_RESET,
  PRODUCE_CREATE_SUCCESS,
  PRODUCE_DELETE_FAIL,
  PRODUCE_DELETE_REQUEST,
  PRODUCE_DELETE_SUCCESS,
  PRODUCE_DELIVER_FAIL,
  PRODUCE_DELIVER_REQUEST,
  PRODUCE_DELIVER_RESET,
  PRODUCE_DELIVER_SUCCESS,
  PRODUCE_DETAILS_FAIL,
  PRODUCE_DETAILS_REQUEST,
  PRODUCE_DETAILS_RESET,
  PRODUCE_DETAILS_SUCCESS,
  PRODUCE_PAY_FAIL,
  PRODUCE_PAY_REQUEST,
  PRODUCE_PAY_RESET,
  PRODUCE_PAY_SUCCESS,
  PRODUCE_UPDATE_FAIL,
  PRODUCE_UPDATE_REQUEST,
  PRODUCE_UPDATE_RESET,
  PRODUCE_UPDATE_SUCCESS,
} from "../constants/produceConstants";

export const myProduceListReducer = (state = { produces: [] }, action) => {
  switch (action.type) {
    case MY_PRODUCES_LIST_REQUEST:
      return { loading: true, produces: [] };
    case MY_PRODUCES_LIST_SUCCESS:
      return {
        loading: false,
        produces: action.payload,
      };
    case MY_PRODUCES_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const myPurchasesListReducer = (state = { purchases: [] }, action) => {
  switch (action.type) {
    case MY_PURCHASES_LIST_REQUEST:
      return { loading: true, purchases: [] };
    case MY_PURCHASES_LIST_SUCCESS:
      return {
        loading: false,
        purchases: action.payload,
      };
    case MY_PURCHASES_LIST_FAIL:
      return { loading: false, error: action.payload };
    case MY_PURCHASES_LIST_RESET:
      return { purchases: [] };
    default:
      return state;
  }
};

export const mySalesListReducer = (state = { sales: [] }, action) => {
  switch (action.type) {
    case MY_SALES_LIST_REQUEST:
      return { loading: true, sales: [] };
    case MY_SALES_LIST_SUCCESS:
      return {
        loading: false,
        sales: action.payload,
      };
    case MY_SALES_LIST_FAIL:
      return { loading: false, error: action.payload };
    case MY_SALES_LIST_RESET:
      return { sales: [] };
    default:
      return state;
  }
};

export const produceDetailsReducer = (
  state = { produce: {}, loading: true },
  action
) => {
  switch (action.type) {
    case PRODUCE_DETAILS_REQUEST:
      return { loading: true, ...state };
    case PRODUCE_DETAILS_SUCCESS:
      return { loading: false, produce: action.payload };
    case PRODUCE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCE_DETAILS_RESET:
      return { produce: {} };

    default:
      return state;
  }
};

export const produceDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCE_DELETE_REQUEST:
      return { loading: true };
    case PRODUCE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case PRODUCE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const produceUpdateReducer = (state = { produce: {} }, action) => {
  switch (action.type) {
    case PRODUCE_UPDATE_REQUEST:
      return { loading: true };
    case PRODUCE_UPDATE_SUCCESS:
      return { loading: false, success: true, produce: action.payload };
    case PRODUCE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCE_UPDATE_RESET:
      return { produce: {} };
    default:
      return state;
  }
};

export const produceCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCE_CREATE_REQUEST:
      return { loading: true };
    case PRODUCE_CREATE_SUCCESS:
      return { loading: false, success: true, produce: action.payload };
    case PRODUCE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const allProduceListReducer = (state = { produces: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCES_LIST_REQUEST:
      return { loading: true, produces: [] };
    case ALL_PRODUCES_LIST_SUCCESS:
      return {
        loading: false,
        produces: action.payload,
      };
    case ALL_PRODUCES_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const producePayReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCE_PAY_REQUEST:
      return {
        loading: true,
      };
    case PRODUCE_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case PRODUCE_PAY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case PRODUCE_PAY_RESET:
      return {};
    default:
      return state;
  }
};

export const produceDeliverReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCE_DELIVER_REQUEST:
      return {
        loading: true,
      };
    case PRODUCE_DELIVER_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case PRODUCE_DELIVER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case PRODUCE_DELIVER_RESET:
      return {};
    default:
      return state;
  }
};
