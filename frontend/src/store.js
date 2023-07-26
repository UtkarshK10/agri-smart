import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productCreateReducer,
  productDeleteReducer,
  productDetailsReducer,
  productListReducer,
  productReviewCreateReducer,
  productTopRatedReducer,
  productUpdateReducer,
} from "./reducers/productReducers.js";
import { cartReducer } from "./reducers/cartReducers.js";
import {
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  userUpdateReducer,
} from "./reducers/userReducers.js";
import {
  orderCreateReducer,
  orderDeliverReducer,
  orderDetailsReducer,
  orderListMyReducer,
  orderListReducer,
  orderPayReducer,
} from "./reducers/orderReducers.js";
import {
  allLandListReducer,
  landCreateReducer,
  landDeleteReducer,
  landDetailsReducer,
  landUpdateReducer,
  myLandListReducer,
} from "./reducers/landReducers.js";
import {
  bidApproveReducer,
  bidCreateReducer,
  bidListByLandReducer,
  bidListMyReducer,
  bidPayReducer,
} from "./reducers/bidReducers.js";
import {
  contractCreateReducer,
  contractDetailsReducer,
  contractListByLandReducer,
  contractListContractorReducer,
  contractListFarmerReducer,
  contractSettleReducer,
} from "./reducers/contractReducers.js";
import {
  allProduceListReducer,
  myProduceListReducer,
  myPurchasesListReducer,
  mySalesListReducer,
  produceCreateReducer,
  produceDeleteReducer,
  produceDeliverReducer,
  produceDetailsReducer,
  producePayReducer,
  produceUpdateReducer,
} from "./reducers/produceReducers.js";

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productReviewCreate: productReviewCreateReducer,
  productTopRated: productTopRatedReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderListMy: orderListMyReducer,
  orderDeliver: orderDeliverReducer,
  orderList: orderListReducer,
  myLandList: myLandListReducer,
  landDelete: landDeleteReducer,
  landDetails: landDetailsReducer,
  landUpdate: landUpdateReducer,
  landCreate: landCreateReducer,
  allLandList: allLandListReducer,
  bidListMy: bidListMyReducer,
  bidCreate: bidCreateReducer,
  bidListByLand: bidListByLandReducer,
  bidApprove: bidApproveReducer,
  bidPay: bidPayReducer,
  contractCreate: contractCreateReducer,
  contractListContractor: contractListContractorReducer,
  contractListFarmer: contractListFarmerReducer,
  contractListByLand: contractListByLandReducer,
  contractSettle: contractSettleReducer,
  contractDetails: contractDetailsReducer,
  myProduceList: myProduceListReducer,
  produceDelete: produceDeleteReducer,
  produceDetails: produceDetailsReducer,
  produceUpdate: produceUpdateReducer,
  produceCreate: produceCreateReducer,
  allProduceList: allProduceListReducer,
  producePay: producePayReducer,
  myPurchasesList: myPurchasesListReducer,
  mySalesList: mySalesListReducer,
  produceDeliver: produceDeliverReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const paymentMethodFromStorage = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : "";

console.log(paymentMethodFromStorage);

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
