import React from "react";
import { Button, Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import MyVerticallyCenteredModal from "./MyVerticallyCenteredModal";

const Land = ({ land, name, util, isFarmer, farmerId }) => {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <Card className="my-3 p-3 rounded">
      {isFarmer ? (
        <Link to={`/contract/land/${land._id}`}>
          <Card.Img src={land.image} variant="top" className="prod-img" />
        </Link>
      ) : (
        <Card.Img src={land.image} variant="top" className="prod-img" />
      )}

      <Card.Body>
        {isFarmer ? (
          <Link to={`/contract/land/${land._id}`}>
            <Card.Title>
              <strong>
                {land.area} Acres Land <i class="fas fa-caret-right"></i>
              </strong>
            </Card.Title>
          </Link>
        ) : (
          <Card.Title>
            <strong>
              {land.area} Acres Land, Owned by {name}
            </strong>
          </Card.Title>
        )}

        <Card.Text>
          At {land.district}, {land.state}
        </Card.Text>
        <Card.Text>Season - {land.season}</Card.Text>
        <Card.Text>Crop - {land.crop}</Card.Text>
        <Card.Text>Est. Production - {land.estProd}Q</Card.Text>
        <Card.Text>Min Bidding Amount - ₹{land.minBidAmt}</Card.Text>
        {/* <Card.Text>Capital Return - {land.capitalReturn}%</Card.Text> */}
        {isFarmer && !land.isTransacted ? (
          <>
            {" "}
            <LinkContainer to={`/contract/land/${land._id}/edit`}>
              <Button variant="primary">
                <i className="fas fa-edit"></i> Edit
              </Button>
            </LinkContainer>
            <Button
              variant="danger"
              className="mx-3"
              onClick={() => util(land._id)}
            >
              <i className="fas fa-trash"></i> Delete
            </Button>
          </>
        ) : isFarmer && land.isTransacted ? (
          <Button variant="success" disabled style={{ color: "black" }}>
            <i class="fas fa-check"></i>
            {"   "} LAND UNDER TRANSACTION
          </Button>
        ) : (
          <>
            <Button variant="primary" onClick={() => setModalShow(true)}>
              <i class="fas fa-rupee-sign"></i> Make Bid
            </Button>
            <MyVerticallyCenteredModal
              show={modalShow}
              landId={land._id}
              minBidAmt={land.minBidAmt}
              farmerId={farmerId}
              onHide={() => setModalShow(false)}
            />
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default Land;
