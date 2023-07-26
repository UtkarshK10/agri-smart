import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
//import leaf from "/images/leaf.png";

const HomeNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Agri-Smart</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Nav className="ml-auto">
          <LinkContainer to="/detector">
            <Nav.Link>
              <img
                src="/images/leaf.png"
                className="leaf"
                alt="Plant Disease Detector"
              />
              Plant Disease Detector
            </Nav.Link>
          </LinkContainer>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default HomeNavbar;
