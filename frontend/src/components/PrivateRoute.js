import React from "react";
import { Route, Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  // console.log(pathname);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, loading } = userLogin;
  return !userInfo && !loading ? (
    <Navigate to={`/login?redirect=${pathname.substring(1)}`} />
  ) : (
    children
  );
};
export default PrivateRoute;
