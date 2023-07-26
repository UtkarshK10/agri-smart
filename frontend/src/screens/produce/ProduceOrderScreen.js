import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { listProduceDetails, payProduce } from "../../actions/produceActions";
import FormContainer from "../../components/FormContainer";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { saveShippingAddress } from "../../actions/cartActions";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import {
  PRODUCE_DETAILS_RESET,
  PRODUCE_PAY_RESET,
} from "../../constants/produceConstants";

const ProduceOrderScreen = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const produceId = params.id;

  const produceDetails = useSelector((state) => state.produceDetails);
  const { loading, error, produce } = produceDetails;

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const producePay = useSelector((state) => state.producePay);
  const { loading: loadingPay, success: successPay } = producePay;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const [sdkReady, setSdkReady] = useState(false);

  useEffect(() => {
    if (!produce || produce._id !== produceId || loading === undefined) {
      // dispatch({ type: PRODUCE_DETAILS_RESET });

      dispatch(listProduceDetails(produceId));
    }
    if (successPay) {
      dispatch({ type: PRODUCE_PAY_RESET });
      navigate("/bazaar/myPurchases");
    }
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!window.paypal) {
      addPayPalScript();
    } else {
      setSdkReady(true);
    }
  }, [dispatch, produceId, produce, sdkReady, successPay, navigate]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    dispatch(
      payProduce(
        produceId,
        {
          address,
          city,
          postalCode,
          country,
        },
        paymentResult
      )
    );
  };

  return (
    <Row>
      <Col md={4}>
        <h2>Produce Details</h2>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Card className="my-3 p-3 rounded">
            <Card.Img src={produce.image} variant="top" className="prod-img" />

            <Card.Body>
              <Card.Title>
                <strong>
                  {produce.name} , {produce.quantity}Kgs
                </strong>
              </Card.Title>
              <Card.Text>Sold By - {produce.seller.name}</Card.Text>
              <Card.Text>Price - ₹{produce.price}</Card.Text>
            </Card.Body>
          </Card>
        )}
      </Col>
      <Col md={8}>
        <h2>ENTER SHIPPING ADDRESS</h2>

        <Form>
          <Form.Group controlId="address">
            <Form.Label>Adress</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter address"
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <br />{" "}
          <div className="add_div">
            <Form.Group controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter city"
                value={city}
                required
                onChange={(e) => setCity(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <br />
            <Form.Group controlId="postalCode">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter postal code"
                value={postalCode}
                required
                onChange={(e) => setPostalCode(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </div>
          <br />
          <div className="add_div">
            <Form.Group controlId="country">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter country"
                value={country}
                required
                onChange={(e) => setCountry(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <br />
            {!sdkReady ? (
              <Loader />
            ) : (
              <PayPalButton
                amount={produce.price}
                onSuccess={successPaymentHandler}
              />
            )}
          </div>
        </Form>
      </Col>
    </Row>
  );
};

export default ProduceOrderScreen;
