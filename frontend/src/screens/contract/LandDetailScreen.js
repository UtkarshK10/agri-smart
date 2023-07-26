import React, { useState, useEffect } from "react";
import { Button, Card, Col, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { approveBid, listLandBids } from "../../actions/bidActions";
import {
  listLandContracts,
  settleContract,
} from "../../actions/contractActions";
import { listLandDetails } from "../../actions/landActions";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  BID_APPROVE_RESET,
  BID_LAND_LIST_RESET,
} from "../../constants/bidConstants";

const LandDetailScreen = () => {
  const navigate = useNavigate();
  const params = useParams();
  const landId = params.id;

  const dispatch = useDispatch();

  const landDetails = useSelector((state) => state.landDetails);
  const { loading, error, land } = landDetails;

  const bidListByLand = useSelector((state) => state.bidListByLand);
  const { loading: loadingBids, error: errorBids, bids } = bidListByLand;

  const contractListByLand = useSelector((state) => state.contractListByLand);
  const {
    loading: loadingContracts,
    error: errorContracts,
    contracts,
  } = contractListByLand;

  const bidApprove = useSelector((state) => state.bidApprove);
  const {
    loading: loadingApprove,
    success: successApprove,
    error: errorApprove,
  } = bidApprove;

  const contractSettle = useSelector((state) => state.contractSettle);
  const {
    loading: loadingSettle,
    success: successSettle,
    error: errorSettle,
  } = contractSettle;

  useEffect(() => {
    if (!land || land._id !== landId) {
      dispatch({ type: BID_LAND_LIST_RESET });
      dispatch(listLandDetails(landId));
    }
    if (land && land._id === landId) {
      // dispatch({type: BID_APPROVE_RESET})
      dispatch(listLandBids(landId));
      dispatch(listLandContracts(landId));
    }
  }, [dispatch, navigate, landId, land, successApprove, successSettle]);

  const approveHandler = (id) => {
    dispatch(approveBid(id));
  };

  const settleHandler = (id) => {
    dispatch(settleContract(id));
  };
  return (
    <Row>
      <Col md={4}>
        <h2>Land Details</h2>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Card className="my-3 p-3 rounded">
            <Card.Img src={land.image} variant="top" className="prod-img" />
            <Card.Body>
              <Card.Title>
                <strong>{land.area} Acres Land</strong>
              </Card.Title>

              <Card.Text>
                At {land.district}, {land.state}
              </Card.Text>
              <Card.Text>Season - {land.season}</Card.Text>
              <Card.Text>Crop - {land.crop}</Card.Text>
              <Card.Text>Est. Production - {land.estProd}</Card.Text>
              <Card.Text>Min Bidding Amount - ₹{land.minBidAmt}</Card.Text>
              {/* <Card.Text>Capital Return - {land.capitalReturn}%</Card.Text> */}
            </Card.Body>
          </Card>
        )}
      </Col>
      <Col md={8}>
        <Row>
          <h2>Bids Received</h2>
          {loadingBids ? (
            <Loader />
          ) : errorBids ? (
            <Message variant="danger">{errorBids}</Message>
          ) : (
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  {/* <th>ID</th> */}
                  <th>DATE</th>
                  <th>CONTRACTOR NAME</th>
                  <th>BIDDING AMOUNT</th>
                  <th>PAID</th>
                  <th>APPROVAL</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {bids.length === 0 && <p>No Bids received yet !</p>}
                {bids.map((bid) => (
                  <tr key={bid._id}>
                    {/* <td>{bid._id}</td> */}
                    <td>{bid.createdAt.substring(0, 10)}</td>
                    <td>{bid.contractorId.name}</td>
                    <td>₹{bid.bidAmt}</td>
                    <td>
                      {" "}
                      {bid.isPaid ? (
                        bid.paidAt.substring(0, 10)
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td>
                      {" "}
                      {/* {bid.isApproved ? (
                      <i class="fas fa-check" style={{ color: "green" }}></i>
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )} */}
                      {bid.isApproved ? (
                        <>APPROVED</>
                      ) : !bid.isActive ? (
                        <>DECLINED</>
                      ) : (
                        <>PENDING</>
                      )}
                    </td>
                    <td>
                      {!bid.isApproved && bid.isActive && (
                        <Button
                          className="btn-sm"
                          variant="primary"
                          onClick={() => approveHandler(bid._id)}
                        >
                          Approve
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Row>
        <br></br>
        <br></br>
        <br></br>
        <Row>
          <h1>Contracts</h1>
          {loadingContracts ? (
            <Loader />
          ) : errorContracts ? (
            <Message variant="danger">{errorContracts}</Message>
          ) : (
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>CONTRACTOR NAME</th>
                  {/* <th>LAND</th> */}
                  <th>AMOUNT</th>
                  <th>VIEW</th>
                  <th>ACTION/STATUS</th>
                </tr>
              </thead>
              <tbody>
                {contracts.length === 0 ? (
                  <p>No Contracts to show yet !</p>
                ) : (
                  contracts.map((contract) => (
                    <tr key={contract._id}>
                      <td>{contract._id}</td>
                      <td>{contract.createdAt.substring(0, 10)}</td>
                      <td>{contract.contractorId.name}</td>
                      {/* <td>
                        {contract.landId.area} acres at {contract.landId.state},{" "}
                        {contract.landId.district}
                      </td> */}
                      <td>₹{contract.contractAmt}</td>
                      <td>
                        <LinkContainer to={`/contract/bonds/${contract._id}`}>
                          <Button variant="light" className="btn-sm">
                            <i class="fas fa-download"></i>
                          </Button>
                        </LinkContainer>
                      </td>
                      <td>
                        {!contract.isSettled ? (
                          <Button
                            variant="primary"
                            className="btn-sm"
                            onClick={() => settleHandler(contract._id)}
                          >
                            <i class="fas fa-check-double"></i> SETTLE
                          </Button>
                        ) : (
                          <Button variant="primary" className="btn-sm" disabled>
                            COMPLETED
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          )}
        </Row>
      </Col>
    </Row>
  );
};

export default LandDetailScreen;
