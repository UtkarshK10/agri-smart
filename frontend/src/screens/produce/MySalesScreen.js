import React, { useEffect } from "react";
import { Button, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deliverProduce, listMySales } from "../../actions/produceActions";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { PRODUCE_DELIVER_RESET } from "../../constants/produceConstants";

const MySalesScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mySalesList = useSelector((state) => state.mySalesList);
  const { loading, sales, error } = mySalesList;

  const produceDeliver = useSelector((state) => state.produceDeliver);
  const { loading: loadingDeliver, success: successDeliver } = produceDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (successDeliver) {
      dispatch({ type: PRODUCE_DELIVER_RESET });
    }
    if (!userInfo) {
      navigate("/login");
    }
    if (userInfo && userInfo.isContractor) {
      navigate("/bazaar/myPurchases");
    } else if (userInfo && userInfo.isFarmer) {
      dispatch(listMySales());
    }
  }, [dispatch, navigate, successDeliver, userInfo]);

  const deliverHandler = (id) => {
    dispatch(deliverProduce(id));
  };

  return (
    <>
      <Row className="align-items-center">
        <h1>My Sales</h1>
      </Row>
      {loadingDeliver && <Loader />}
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
              <th>BUYER NAME</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {sales.length === 0 ? (
              <p>No Sales to show yet !</p>
            ) : (
              sales.map((sale) => (
                <tr key={sale._id}>
                  <td>{sale.paidAt.substring(0, 10)}</td>
                  <td>{sale.name}</td>
                  <td>{sale.quantity} Kgs</td>
                  <td> &#8377;{sale.price}</td>
                  <td>{sale.buyer.name}</td>
                  <td>
                    {sale.isDelivered ? (
                      `DELIVERED ON ${sale.deliveredAt.substring(0, 10)}`
                    ) : (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => deliverHandler(sale._id)}
                      >
                        MARK AS DELIVERED
                      </Button>
                    )}
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

export default MySalesScreen;
