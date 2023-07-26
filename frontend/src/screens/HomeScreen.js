import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const HomeScreen = () => {
  return (
    <>
      <Row>
        <Col sm={12} md={12} lg={4} xl={4}>
          <Card className="my-3 p-3 rounded">
            <Link to={`/inventory`}>
              <Card.Img src="/images/Inventory.jpg" variant="top" />
            </Link>
            <Card.Body>
              <Link to={`/inventory`}>
                <Card.Title as="div">
                  <h3>Agri-Inventory</h3>
                </Card.Title>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={12} md={12} lg={4} xl={4}>
          <Card className="my-3 p-3 rounded">
            <Link to={`/contract`}>
              <Card.Img src="/images/Contract.jpg" variant="top" />
            </Link>
            <Card.Body>
              <Link to={`/contract`}>
                <Card.Title as="div">
                  <h3>Agri-Tract</h3>
                </Card.Title>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={12} md={12} lg={4} xl={4}>
          <Card className="my-3 p-3 rounded">
            <Link to={`/bazaar`}>
              <Card.Img src="/images/Bazaar.jpg" variant="top" />
            </Link>
            <Card.Body>
              <Link to={`/bazaar`}>
                <Card.Title as="div">
                  <h3>Agri-Bazaar</h3>
                </Card.Title>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default HomeScreen;
