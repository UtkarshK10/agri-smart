import {
  CONTRACT_CREATE_FAIL,
  CONTRACT_CREATE_REQUEST,
  CONTRACT_CREATE_RESET,
  CONTRACT_CREATE_SUCCESS,
  CONTRACT_DETAILS_FAIL,
  CONTRACT_DETAILS_REQUEST,
  CONTRACT_DETAILS_SUCCESS,
  CONTRACT_LAND_LIST_FAIL,
  CONTRACT_LAND_LIST_REQUEST,
  CONTRACT_LAND_LIST_RESET,
  CONTRACT_LAND_LIST_SUCCESS,
  CONTRACT_LIST_CONTRACTOR_FAIL,
  CONTRACT_LIST_CONTRACTOR_REQUEST,
  CONTRACT_LIST_CONTRACTOR_RESET,
  CONTRACT_LIST_CONTRACTOR_SUCCESS,
  CONTRACT_LIST_FARMER_FAIL,
  CONTRACT_LIST_FARMER_REQUEST,
  CONTRACT_LIST_FARMER_RESET,
  CONTRACT_LIST_FARMER_SUCCESS,
  CONTRACT_SETTLE_FAIL,
  CONTRACT_SETTLE_REQUEST,
  CONTRACT_SETTLE_RESET,
  CONTRACT_SETTLE_SUCCESS,
} from "../constants/contractConstants";

export const contractCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CONTRACT_CREATE_REQUEST:
      return {
        loading: true,
      };
    case CONTRACT_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        contract: action.payload,
      };
    case CONTRACT_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CONTRACT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const contractListContractorReducer = (
  state = { contracts: [] },
  action
) => {
  switch (action.type) {
    case CONTRACT_LIST_CONTRACTOR_REQUEST:
      return {
        loading: true,
      };
    case CONTRACT_LIST_CONTRACTOR_SUCCESS:
      return {
        loading: false,
        contracts: action.payload,
      };
    case CONTRACT_LIST_CONTRACTOR_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CONTRACT_LIST_CONTRACTOR_RESET:
      return { contracts: [] };
    default:
      return state;
  }
};

export const contractListFarmerReducer = (
  state = { contracts: [] },
  action
) => {
  switch (action.type) {
    case CONTRACT_LIST_FARMER_REQUEST:
      return {
        loading: true,
      };
    case CONTRACT_LIST_FARMER_SUCCESS:
      return {
        loading: false,
        contracts: action.payload,
      };
    case CONTRACT_LIST_FARMER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CONTRACT_LIST_FARMER_RESET:
      return { contracts: [] };
    default:
      return state;
  }
};

export const contractListByLandReducer = (
  state = { contracts: [] },
  action
) => {
  switch (action.type) {
    case CONTRACT_LAND_LIST_REQUEST:
      return {
        loading: true,
      };
    case CONTRACT_LAND_LIST_SUCCESS:
      return {
        loading: false,
        contracts: action.payload,
      };
    case CONTRACT_LAND_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CONTRACT_LAND_LIST_RESET:
      return { contracts: [] };
    default:
      return state;
  }
};

export const contractSettleReducer = (state = {}, action) => {
  switch (action.type) {
    case CONTRACT_SETTLE_REQUEST:
      return {
        loading: true,
      };
    case CONTRACT_SETTLE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case CONTRACT_SETTLE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CONTRACT_SETTLE_RESET:
      return {};
    default:
      return state;
  }
};

export const contractDetailsReducer = (
  state = { loading: true, contract: {} },
  action
) => {
  switch (action.type) {
    case CONTRACT_DETAILS_REQUEST:
      return { loading: true, ...state };
    case CONTRACT_DETAILS_SUCCESS:
      return { loading: false, contract: action.payload };
    case CONTRACT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
