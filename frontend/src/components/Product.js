import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = ({ product }) => {
  const truncate = (input) =>
    input.length > 30 ? `${input.substring(0, 30)}...` : input;

  console.log(truncate(product.name));

  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/inventory/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" className="prod-img" />
      </Link>
      <Card.Body>
        <Link to={`/inventory/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{truncate(product.name)}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <div className="my-3">
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
          </div>
        </Card.Text>
        <Card.Text as="h3">₹{product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
