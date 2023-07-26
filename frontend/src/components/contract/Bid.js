import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { createContract } from "../../actions/contractActions";
import Loader from "../Loader";
import MyVerticallyCenteredModal from "./MyVerticallyCenteredModal";

const Bid = ({ bid, successPaymentHandler, bidPay, sdkReady }) => {
  const { landId: land, farmerId, bidAmt, isApproved, isActive, isPaid } = bid;

  const { loadingPay, successPay } = bidPay;
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <Card className="my-3 p-3 rounded">
      <Card.Img src={land.image} variant="top" className="prod-img" />

      <Card.Body>
        <Card.Title>
          <strong>
            {land.area} Acres Land, Owned by {farmerId.name}
          </strong>
        </Card.Title>
        <Card.Text>
          At {land.district}, {land.state}
        </Card.Text>
        <Card.Text>Season - {land.season}</Card.Text>
        <Card.Text>Crop - {land.crop}</Card.Text>
        <Card.Text>Bidding Amount - ₹{bidAmt}</Card.Text>

        {isPaid ? (
          <Button variant="success" disabled style={{ color: "black" }}>
            <i class="fas fa-check"></i>
            {"   "} BID COMPLETED
          </Button>
        ) : isApproved && !isPaid ? (
          <>
            {loadingPay && <Loader />}
            {!sdkReady ? (
              <Loader />
            ) : (
              <PayPalButton
                amount={bidAmt}
                onSuccess={(paymentResult) => {
                  successPaymentHandler(paymentResult, bid);
                }}
              />
            )}
          </>
        ) : //   <Button variant="primary" onClick={() => util()}>
        //     <i class="fas fa-rupee-sign"></i> Make Payment
        //   </Button>
        !isActive ? (
          <Button variant="primary" disabled>
            <i class="fas fa-times"></i>
            {"   "} BID DECLINED
          </Button>
        ) : (
          <Button variant="primary" disabled>
            <i class="fas fa-hourglass-half"></i>
            {"   "} Pending Approval
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default Bid;
