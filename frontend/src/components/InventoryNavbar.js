import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../actions/userActions";
import SearchBox from "./SearchBox";
import { useLocation } from "react-router-dom";
import { path } from "express/lib/application";

const InventoryNavbar = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
      <Container>
        <LinkContainer to="/inventory">
          <Navbar.Brand>Agri-Inventory</Navbar.Brand>
        </LinkContainer>

        <LinkContainer to="/">
          <Nav.Link>
            <span class="home">Home</span>
          </Nav.Link>
        </LinkContainer>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <SearchBox />

          <Nav className="ml-auto">
            <LinkContainer to="/inventory/cart">
              <Nav.Link>
                <i className="fas fa-shopping-cart"></i> Cart
              </Nav.Link>
            </LinkContainer>

            {userInfo ? (
              <NavDropdown title={userInfo.name} id="username">
                <LinkContainer to="/inventory/profile">
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to="/login">
                <Nav.Link>
                  <i className="fas fa-user"></i> Sign In
                </Nav.Link>
              </LinkContainer>
            )}
            {userInfo && userInfo.isAdmin && (
              <NavDropdown title="Admin" id="adminmenu">
                <LinkContainer to="/inventory/admin/userlist">
                  <NavDropdown.Item>Users</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/inventory/admin/productlist">
                  <NavDropdown.Item>Products</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/inventory/admin/orderlist">
                  <NavDropdown.Item>Orders</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default InventoryNavbar;
