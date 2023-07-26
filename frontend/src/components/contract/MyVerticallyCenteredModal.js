import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createBid } from "../../actions/bidActions";
import { BID_CREATE_RESET } from "../../constants/bidConstants";
import FormContainer from "../FormContainer";
import Loader from "../Loader";
import Message from "../Message";

const MyVerticallyCenteredModal = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  const [bidAmt, setBidAmt] = useState(0);

  const bidCreate = useSelector((state) => state.bidCreate);
  const { loading, error, success, bid } = bidCreate;
  const [warning, setWarning] = useState("");

  useEffect(() => {
    if (success) {
      dispatch({ type: BID_CREATE_RESET });
      //   props.onHide();
      navigate("/contract/myBids");
    }
  }, [success, navigate, dispatch]);

  const submitHandler = () => {
    if (bidAmt >= props.minBidAmt) {
      dispatch(
        createBid({
          landId: props.landId,
          farmerId: props.farmerId,
          bidAmt,
        })
      );
    } else {
      setWarning("BIDDING AMOUNT SHOULD BE >= MIN BIDDING AMOUNT");
    }
  };

  return (
    <Modal
      {...props}
      size="fullscreen"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <h4>Enter Bidding Amount</h4>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form>
            {warning.length > 1 && (
              <Message variant="danger">{warning}</Message>
            )}
            <Form.Group controlId="bid">
              <Form.Control
                type="number"
                placeholder="Enter Bidding Amount in ₹"
                value={bidAmt}
                onChange={(e) => setBidAmt(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={props.onHide}>
          Close
        </Button>
        <Button type="submit" variant="primary" onClick={submitHandler}>
          Confirm Bid
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MyVerticallyCenteredModal;
