import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listAllProduces } from "../../actions/produceActions";
import Produce from "../../components/contract/Produce";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

const AllProduceScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const allProduceList = useSelector((state) => state.allProduceList);
  const { loading, produces, error } = allProduceList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    if (userInfo && userInfo.isFarmer) {
      navigate("/bazaar");
    } else if (userInfo && userInfo.isContractor) {
      dispatch(listAllProduces());
    }
  }, [dispatch, navigate, userInfo]);
  return (
    <>
      <h1>ALL PRODUCES</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {produces.length === 0 && <p> No produces to show yet</p>}
          {produces.map((produce) => (
            <Col key={produce._id} sm={12} md={6} lg={4} xl={4}>
              <Produce produce={produce} isFarmer={false} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default AllProduceScreen;
