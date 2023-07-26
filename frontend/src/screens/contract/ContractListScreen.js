import React, { useEffect } from "react";
import { Button, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  listContractorContracts,
  listFarmerContracts,
  settleContract,
} from "../../actions/contractActions";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

const ContractorContractsScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const contractListContractor = useSelector(
    (state) => state.contractListContractor
  );

  const { loading, contracts, error } = contractListContractor;
  const contractListFarmer = useSelector((state) => state.contractListFarmer);
  const {
    loading: loadingFarmer,
    contracts: contractsFarmer,
    error: errorFarmer,
  } = contractListFarmer;
  const contractSettle = useSelector((state) => state.contractSettle);
  const {
    loading: loadingSettle,
    success: successSettle,
    error: errorSettle,
  } = contractSettle;

  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    if (userInfo && userInfo.isContractor) {
      dispatch(listContractorContracts());
    } else if (userInfo && userInfo.isFarmer) {
      dispatch(listFarmerContracts());
    }
  }, [dispatch, navigate, userInfo, successSettle]);
  const settleHandler = (id) => {
    dispatch(settleContract(id));
  };
  return (
    <>
      <Row className="align-items-center">
        <h1>Contracts</h1>
      </Row>
      {loading || loadingFarmer ? (
        <Loader />
      ) : error || errorFarmer ? (
        <Message variant="danger">
          {error}
          {errorFarmer}
        </Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                {userInfo.isContractor && <th>FARMER</th>}
                {userInfo.isFarmer && <th>CONTRACTOR</th>}

                <th>LAND</th>
                <th>AMOUNT</th>
                <th>VIEW</th>
                {userInfo.isFarmer && <th>ACTION/STATUS</th>}
                {userInfo.isContractor && <th>STATUS</th>}
              </tr>
            </thead>
            <tbody>
              {userInfo.isContractor && contracts.length === 0 ? (
                <p>No Contracts to show yet !</p>
              ) : (
                contracts.map((contract) => (
                  <tr key={contract._id}>
                    <td>{contract._id}</td>
                    <td>{contract.farmerId.name}</td>
                    <td>
                      {contract.landId.area} acres at {contract.landId.state},
                      {contract.landId.district}
                    </td>
                    <td>₹{contract.contractAmt}</td>
                    <td>
                      <LinkContainer to={`/contract/bonds/${contract._id}`}>
                        <Button variant="light" className="btn-sm">
                          <i class="fas fa-download"></i>
                        </Button>
                      </LinkContainer>
                    </td>
                    <td>
                      {contract.isSettled ? <p>SETTLED</p> : <p>ONGOING</p>}
                    </td>
                  </tr>
                ))
              )}
              {userInfo.isFarmer && contractsFarmer.length === 0 ? (
                <p>No Contracts to show yet !</p>
              ) : (
                contractsFarmer.map((contract) => (
                  <tr key={contract._id}>
                    <td>{contract._id}</td>
                    <td>{contract.contractorId.name}</td>
                    <td>
                      {contract.landId.area} acres at {contract.landId.state},{" "}
                      {contract.landId.district}
                    </td>
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
        </>
      )}
    </>
  );
};

export default ContractorContractsScreen;
