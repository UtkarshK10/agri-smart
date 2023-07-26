import React, { useState, useEffect, useRef } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { listContractDetails } from "../../actions/contractActions";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import "./ContractDetails.css";

const ContractDetailsScreen = () => {
  const navigate = useNavigate();
  const params = useParams();
  const contractId = params.id;

  const dispatch = useDispatch();
  const pdfRef = useRef();

  const contractDetails = useSelector((state) => state.contractDetails);
  const { loading, error, contract } = contractDetails;
  console.log(contractId);

  useEffect(() => {
    if (!contract || contract._id !== contractId) {
      dispatch(listContractDetails(contractId));
    }
  }, [dispatch, contract, navigate, contractId]);
  console.log(contractDetails);
  return (
    <>
      <Button onClick={() => navigate(-1)} className="btn btn-light my-3">
        Go Back
      </Button>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <div className="contract-bond" ref={pdfRef}>
            <div className="contract-bond-header">
              <img src={`/images/icon.png`} alt="logo" />
              <h1>AGRI-SMART</h1>
            </div>
            <div className="contract-bond-content">
              <h2>FARMING CONTRACT BOND</h2>
              <h6>Contract ID: {contract._id}</h6>
              <p>
                {" "}
                THIS CONTRACT IS FOR{" "}
                <span className="text-uppercase bold">
                  {contract.landId.area} ACRES
                </span>{" "}
                LAND AT{" "}
                <span className="text-uppercase bold">
                  {contract.landId.district}
                </span>
                ,{" "}
                <span className="text-uppercase bold">
                  {contract.landId.state}
                </span>
              </p>
              <p>BETWEEN</p>
              <p>
                CONTRACTOR:{" "}
                <span className="text-uppercase bold">
                  {contract.contractorId.name}
                </span>{" "}
              </p>
              <p>AND</p>
              <p>
                FARMER:{" "}
                <span className="text-uppercase bold">
                  {contract.farmerId.name}
                </span>{" "}
              </p>
              <p>
                FOR AN AMOUNT OF{" "}
                <span className="text-uppercase bold">
                  &#8377;{contract.contractAmt}
                </span>{" "}
              </p>
              <p>
                FROM{" "}
                {
                  <span className="text-uppercase bold">
                    {contract.createdAt.substring(0, 10)}
                  </span>
                }{" "}
                TO{" "}
                {contract.isSettled ? (
                  <span className="text-uppercase bold">
                    {contract.settledAt.substring(0, 10)}
                  </span>
                ) : (
                  <span className="text-uppercase bold">ONGOING</span>
                )}
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ContractDetailsScreen;
