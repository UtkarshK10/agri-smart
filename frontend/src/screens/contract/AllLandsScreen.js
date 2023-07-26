import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listAllLands } from "../../actions/landActions";
import Land from "../../components/contract/Land";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

const AllLandsScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const allLandList = useSelector((state) => state.allLandList);
  const { loading, lands, error } = allLandList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    if (userInfo && userInfo.isFarmer) {
      navigate("/contract");
    } else if (userInfo && userInfo.isContractor) {
      dispatch(listAllLands());
    }
  }, [dispatch, navigate, userInfo]);

  return (
    <>
      <h1>ALL LANDS</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {lands.length === 0 && <p> No lands to show yet</p>}
          {lands.map((land) => (
            <Col key={land._id} sm={12} md={6} lg={4} xl={4}>
              <Land
                land={land}
                name={land.user.name}
                isFarmer={false}
                farmerId={land.user._id}
              />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default AllLandsScreen;
