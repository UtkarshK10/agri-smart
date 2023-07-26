import React, { useEffect } from "react";
import { Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listMyPurchases } from "../../actions/produceActions";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

const MyPurchasesScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const myPurchasesList = useSelector((state) => state.myPurchasesList);
  const { loading, purchases, error } = myPurchasesList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    if (userInfo && userInfo.isFarmer) {
      navigate("/bazaar/mySales");
    } else if (userInfo && userInfo.isContractor) {
      dispatch(listMyPurchases());
    }
  }, [dispatch, navigate, userInfo]);

  return (
    <>
      <Row className="align-items-center">
        <h1>My Purchases</h1>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>DATE</th>
              <th>PRODUCE NAME</th>
              <th>QUANTITY</th>
              <th>PRICE</th>
              <th>SELLER NAME</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {purchases.length === 0 ? (
              <p>No Purchases to show yet !</p>
            ) : (
              purchases.map((purchase) => (
                <tr key={purchase._id}>
                  <td>{purchase.paidAt.substring(0, 10)}</td>
                  <td>{purchase.name}</td>
                  <td>{purchase.quantity} Kgs</td>
                  <td> &#8377;{purchase.price}</td>
                  <td>{purchase.seller.name}</td>
                  <td>
                    {purchase.isDelivered
                      ? `DELIVERED ON ${purchase.deliveredAt.substring(0, 10)}`
                      : "NOT DELIVERED"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default MyPurchasesScreen;
