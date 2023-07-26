import React, { useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createLand, deleteLand, listMyLands } from "../../actions/landActions";
import Land from "../../components/contract/Land";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { LAND_CREATE_RESET } from "../../constants/landConstants";

const MyLandsScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const myLandList = useSelector((state) => state.myLandList);
  const { loading, lands, error } = myLandList;

  const landDelete = useSelector((state) => state.landDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = landDelete;

  const landCreate = useSelector((state) => state.landCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    land: createdland,
  } = landCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: LAND_CREATE_RESET });
    if (!userInfo) {
      navigate("/login");
    }
    if (userInfo && userInfo.isContractor) {
      navigate("/contract/allLands");
    }
    if (successCreate) {
      navigate(`/contract/land/${createdland._id}/edit`);
    } else if (userInfo && userInfo.isFarmer) {
      dispatch(listMyLands());
    }
  }, [dispatch, navigate, userInfo, successDelete, successCreate, createdland]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure? ")) {
      dispatch(deleteLand(id));
    }
  };

  const createLandHandler = () => {
    dispatch(createLand());
  };

  return (
    <>
      <Row>
        <Col>
          <h1>MY LANDS</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createLandHandler}>
            <i className="fas fa-plus"></i> Add Land
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
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
                name={userInfo.name}
                util={deleteHandler}
                isFarmer={true}
              />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default MyLandsScreen;
