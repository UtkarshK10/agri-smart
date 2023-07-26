import React from "react";
import { Button, Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import MyVerticallyCenteredModal from "./MyVerticallyCenteredModal";

const Produce = ({ produce, util, isFarmer }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Card.Img src={produce.image} variant="top" className="prod-img" />

      <Card.Body>
        <Card.Title>
          <strong>
            {produce.name} , {produce.quantity}Kgs
          </strong>
        </Card.Title>
        {!isFarmer && <Card.Text>Sold By - {produce.seller.name}</Card.Text>}
        <Card.Text>Price - ₹{produce.price}</Card.Text>
        {isFarmer ? (
          <>
            <LinkContainer to={`/bazaar/produce/${produce._id}/edit`}>
              <Button variant="primary">
                <i className="fas fa-edit"></i> Edit
              </Button>
            </LinkContainer>
            <Button
              variant="danger"
              className="mx-3"
              onClick={() => util(produce._id)}
            >
              <i className="fas fa-trash"></i> Delete
            </Button>{" "}
          </>
        ) : (
          <LinkContainer to={`/bazaar/produce/${produce._id}/order`}>
            <Button variant="primary">
              <i class="fas fa-angle-double-right"></i> Place Order
            </Button>
          </LinkContainer>
        )}
      </Card.Body>
    </Card>
  );
};

export default Produce;
