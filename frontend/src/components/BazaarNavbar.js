import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../actions/userActions";
// import SearchBox from "./SearchBox";
import { useLocation } from "react-router-dom";

const BazaarNavbar = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
      <Container>
        <LinkContainer to='/bazaar'>
          <Navbar.Brand>Agri-Bazaar</Navbar.Brand>
        </LinkContainer>

        <LinkContainer to='/'>
          <Nav.Link>
            <span class='home'>Home</span>
          </Nav.Link>
        </LinkContainer>

        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          {/* <SearchBox /> */}

          <Nav className='ml-auto'>
            {userInfo.isContractor && (
              <LinkContainer to='/bazaar/myPurchases'>
                <Nav.Link>
                  <i class='fas fa-rupee-sign'></i> My Purchases
                </Nav.Link>
              </LinkContainer>
            )}

            {userInfo.isFarmer && (
              <LinkContainer to='/bazaar/mySales'>
                <Nav.Link>
                  <i class='fas fa-rupee-sign'></i> My Sales
                </Nav.Link>
              </LinkContainer>
            )}

            <NavDropdown title={userInfo.name} id='username'>
              {/* <LinkContainer to="/bazaar/profile">
                <NavDropdown.Item>Profile</NavDropdown.Item>
              </LinkContainer> */}
              <NavDropdown.Item onClick={logoutHandler}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default BazaarNavbar;
