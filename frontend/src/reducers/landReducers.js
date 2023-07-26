import {
  ALL_LANDS_LIST_FAIL,
  ALL_LANDS_LIST_REQUEST,
  ALL_LANDS_LIST_SUCCESS,
  LAND_CREATE_FAIL,
  LAND_CREATE_REQUEST,
  LAND_CREATE_RESET,
  LAND_CREATE_SUCCESS,
  LAND_DELETE_FAIL,
  LAND_DELETE_REQUEST,
  LAND_DELETE_SUCCESS,
  LAND_DETAILS_FAIL,
  LAND_DETAILS_REQUEST,
  LAND_DETAILS_SUCCESS,
  LAND_UPDATE_FAIL,
  LAND_UPDATE_REQUEST,
  LAND_UPDATE_RESET,
  LAND_UPDATE_SUCCESS,
  MY_LANDS_LIST_FAIL,
  MY_LANDS_LIST_REQUEST,
  MY_LANDS_LIST_SUCCESS,
} from "../constants/landConstants";

export const myLandListReducer = (state = { lands: [] }, action) => {
  switch (action.type) {
    case MY_LANDS_LIST_REQUEST:
      return { loading: true, lands: [] };
    case MY_LANDS_LIST_SUCCESS:
      return {
        loading: false,
        lands: action.payload,
      };
    case MY_LANDS_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const allLandListReducer = (state = { lands: [] }, action) => {
  switch (action.type) {
    case ALL_LANDS_LIST_REQUEST:
      return { loading: true, lands: [] };
    case ALL_LANDS_LIST_SUCCESS:
      return {
        loading: false,
        lands: action.payload,
      };
    case ALL_LANDS_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const landDetailsReducer = (state = { land: {} }, action) => {
  switch (action.type) {
    case LAND_DETAILS_REQUEST:
      return { loading: true, ...state };
    case LAND_DETAILS_SUCCESS:
      return { loading: false, land: action.payload };
    case LAND_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const landDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case LAND_DELETE_REQUEST:
      return { loading: true };
    case LAND_DELETE_SUCCESS:
      return { loading: false, success: true };
    case LAND_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const landUpdateReducer = (state = { land: {} }, action) => {
  switch (action.type) {
    case LAND_UPDATE_REQUEST:
      return { loading: true };
    case LAND_UPDATE_SUCCESS:
      return { loading: false, success: true, land: action.payload };
    case LAND_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case LAND_UPDATE_RESET:
      return { land: {} };
    default:
      return state;
  }
};

export const landCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case LAND_CREATE_REQUEST:
      return { loading: true };
    case LAND_CREATE_SUCCESS:
      return { loading: false, success: true, land: action.payload };
    case LAND_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case LAND_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
