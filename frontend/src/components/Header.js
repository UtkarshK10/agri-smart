import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../actions/userActions";
import SearchBox from "./SearchBox";
import { useLocation } from "react-router-dom";
import { path } from "express/lib/application";
import InventoryNavbar from "./InventoryNavbar";
import ContractNavbar from "./ContractNavbar";
import HomeNavbar from "./HomeNavbar";
import BazaarNavbar from "./BazaarNavbar";
// import leaf from "/images/leaf.png";

const Header = () => {
  // const dispatch = useDispatch();
  const { pathname } = useLocation();
  // console.log(pathname);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // const logoutHandler = () => {
  //   dispatch(logout());
  // };

  // const getPath = () => {
  //   const paths = ["/contract", "/bazaar", "/detector"];
  //   const res = {};
  //   if (
  //     (pathname.includes("/inventory") || pathname.length > 1) &&
  //     !paths.includes(pathname)
  //   ) {
  //     res["url"] = "/inventory";
  //     res["pathName"] = "Agri-Inventory";
  //   } else if (pathname.includes("/")) {
  //     res["url"] = "/";
  //     res["pathName"] = "Agri-Smart";
  //   }
  //   console.log(res);
  //   return res;
  // };

  // const { url, pathName } = getPath();
  // const isHome = (() => url === "/")();

  return (
    <header>
      {pathname.includes("/inventory") ? (
        <InventoryNavbar />
      ) : userInfo && pathname.includes("/contract") ? (
        <ContractNavbar />
      ) : userInfo && pathname.includes("/bazaar") ? (
        <BazaarNavbar />
      ) : (
        <HomeNavbar />
      )}
    </header>
  );
};

export default Header;
